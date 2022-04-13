/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const esbuild = require("esbuild");
const path = require("path");

const isProduction = process.argv.findIndex((Item) => Item === "--mode=production") >= 0;
const isWatch = process.argv.findIndex((Item) => Item === "--watch") >= 0;

(async () => {
    const contexts = [
        {
            label: "client",
            platform: "browser",
            entryPoints: ["./src/client/index.ts"],
            outdir: `build/client`,
            target: ["chrome93"],
            format: "iife",
        },
        {
            label: "server",
            platform: "node",
            entryPoints: ["./src/server/index.ts"],
            outdir: `build/server`,
            target: ["node16"],
            format: "iife",
            plugins: [
                {
                    name: "ts-paths",
                    setup: (build) => {
                        build.onResolve({ filter: /@citizenfx/ }, (args) => {
                            return { namespace: "ignore", path: "." };
                        });

                        build.onResolve({ filter: /.*/ }, (args) => {
                            if (!args.path.match(/^@(server|client|ui)/) && args.kind === "import-statement") {
                                let modulePath;

                                if (args.path.startsWith("@/")) {
                                    modulePath = path.join(...process.cwd().split(path.sep), args.path.replace(/^@\//, ""));
                                } else {
                                    modulePath = require.resolve(args.path);

                                    if (path.isAbsolute(modulePath)) {
                                        modulePath = path.join(...process.cwd().split(path.sep), "node_modules", args.path);
                                    }
                                }

                                return {
                                    path: modulePath,
                                    external: true,
                                };
                            }
                        });

                        build.onLoad({ filter: /.*/, namespace: "ignore" }, (args) => {
                            return {
                                contents: "",
                            };
                        });
                    },
                },
            ],
        },
    ];

    for (const context of contexts) {
        const label = context.label;
        delete context.label;

        try {
            const result = await esbuild.build({
                bundle: true,
                assetNames: `[name].[ext]`,
                minify: isProduction,
                sourcemap: false,
                metafile: true,
                watch: isWatch
                    ? {
                          onRebuild: (err, res) => {
                              if (err) {
                                  return console.error(`[${label}] rebuild error: ${err}`);
                              }
                              console.log(`Rebuilt Module [${label}] Successfully with ${res.warnings.length} warnings ${res.warnings}`);
                          },
                      }
                    : false,
                ...context,
            });

            const analize = esbuild.analyzeMetafileSync(result.metafile, {
                color: true,
                verbose: true,
            });

            console.log(analize);
        } catch (error) {
            console.error(`[${label}] Build Failed: ${error}`);
        }
    }
})();
