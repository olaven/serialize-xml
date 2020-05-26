/**
 * Represents an XML tag. 
 */
export interface Tag {
  name: string;
  children: Tag[] | string;
  attributes: [string, string][];
}

/**
  * Represents an XML declaration.
 */
 export interface Declaration {
   attributes: [string, string][]
 }

/**
 * Returns a `Tag`
 * @param name name of the tag 
 * @param children subtags/string content 
 * @param attributes key/value attributes of the tag
 */
export function tag(name: string, children: string | Tag[] = "", attributes: [string, string][] = []): Tag {
  return {name, children, attributes}
}


export function declaration(attributes: [string, string][]): Declaration {
  return { attributes }
}

/**
 * Serializes given tag and its children 
 * to an XML string.  
 * @param {Tag | Declaration} node the tag (or declaration) to serialize 
 * @param {boolean} declaration the outer tag is an xml-declaration
 */
export function serialize(node: Tag | Declaration): string {

  const attributes = format_attributes(node);

  //NOTE: assuming that this is a Tag if name is present
  if (node.hasOwnProperty("name")) {
    
    const tag = node as Tag; 
    const children = get_children(tag);
    return format_tag(tag.name, attributes, children);
  } else {

    return format_declaration(attributes);
  }
};

const format_declaration = (attributes: string) => `<?xml ${attributes}?>`


const get_children = (tag: Tag) =>
  (typeof (tag.children) === "string")
    ? tag.children
    : tag.children
      .map((child) => serialize(child))
      .join("");

const format_attributes = (node: Tag | Declaration) =>
  node.attributes
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");

const format_tag = (name: string, attributes: string, content: string) =>
  `<${name}${attributes.length > 0
    ? ` ${attributes}`
    : ``}>${content}</${name}>`;
