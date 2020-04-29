/**
 * Represents an XML tag. 
 */
export interface Tag {
  name: string;
  children: Tag[] | string;
  attributes: [string, string][];
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

/**
 * Serializes given tag and its children 
 * to an XML string.  
 * @param {Tag} tag the tag to serialize 
 */
export function serialize(tag: Tag): string {
  const children = get_children(tag);
  const attributes = format_attributes(tag);

  return format_tag(tag.name, attributes, children);
};


const get_children = (tag: Tag) =>
  (typeof (tag.children) === "string")
    ? tag.children
    : tag.children
      .map((child) => serialize(child))
      .join("");

const format_attributes = (tag: Tag) =>
  tag.attributes
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");

const format_tag = (name: string, attributes: string, content: string) =>
  `<${name}${attributes.length > 0
    ? ` ${attributes}`
    : ``}>${content}</${name}>`;
