import { appEvent } from "./NUI";
import "@citizenfx/client";

RegisterCommand(
    "visible",
    (source: number, args: any[]) => {
        appEvent("Hud", "setVisible", { visible: args[0] });
    },
    false
);

RegisterCommand(
    "data",
    (source: number, args: any[]) => {
        appEvent("Hud", "setData", { data: args[0] });
    },
    false
);
