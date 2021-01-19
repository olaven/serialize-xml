const [declarationError, declaration] = await Deno.bundle(
    "./mod.ts",
    undefined,
    {
        declaration: true,
        emitDeclarationOnly: true,
        declarationMap: true,
    }
);