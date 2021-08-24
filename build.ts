import { write_file } from "https://denopkg.com/olaven/dio"


export const { files , diagnostics} = await Deno.emit(
    "./mod.ts",
    {
        bundle: "module", 
        compilerOptions: {
            //NOTE: not supported currently. 
            //FIXME: add when it is 
            //declaration: true
        }
    }
);

if (diagnostics.length) {

    console.log("error building ", diagnostics)
} else {

    const content = files["deno:///bundle.js"]
    write_file("index.js", content);
    console.log("Built serialize-xml :)");
}