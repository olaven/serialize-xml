/**
 * Represents an XML tag. 
 */
export interface Tag {
  name: string;
  children: Tag[] | string;
  attributes: [string, string][];
}

const get_content = (tag: Tag) =>
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

/**
 * Serializes given tag and its children 
 * to an XML string.  
 * @param {Tag} tag the tag to serialize 
 */
export const serialize = (tag: Tag): string => {
  const content = get_content(tag);
  const attributes = format_attributes(tag);

  return format_tag(tag.name, attributes, content);
};
