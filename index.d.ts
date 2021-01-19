
declare interface Tag {
    name: string;
    children: Tag[] | string;
    attributes: [string, string][];
}
declare interface Declaration {
    attributes: [string, string][]
}

export function tag(name: string, children?: string | Tag[], attributes?: [string, string][]): Tag
export function declaration(attributes: [string, string][]): Declaration
export function serialize(...nodes: (Tag[] | Declaration[])): string 