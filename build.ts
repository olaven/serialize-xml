import { write_file } from "https://denopkg.com/olaven/dio"

export const [diagnostics, emited] = await Deno.bundle(
    "./mod.ts",
    undefined,
    {
        declaration: true,
    }
);

if (diagnostics) {

    console.log("error bulding ", diagnostics)
} else {

    write_file("index.js", emited);
    console.log("Bulit serialize-xml :)");
}