/**
 * Represents an XML tag. 
 */
export interface Tag {
  name: string;
  children: Tag[] | string;
  attributes: [string, string][];
}

export const tag = (name: string, children: string | Tag[], attributes: [string, string][] = []): Tag => ({
  name, children, attributes
});

const get_content = (tag: Tag) =>
  (typeof (tag.children) === "string")
    ? tag.children
    : tag.children
      .map((child) => serialize(child))
      .join("");

const format_attributes = (tag: Tag) =>
  tag.attributes
    .map((attribute) => `${attribute[0]}="${attribute[1]}"`)
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
