# serialize-xml ![Test](https://github.com/olaven/serialize-xml/workflows/Test/badge.svg) [![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/raw.githubusercontent.com/olaven/serialize-xml/v0.4.0/mod.ts) [![codebeat badge](https://codebeat.co/badges/d8b0bc93-f488-41bb-a251-8a28a8bcd1b9)](https://codebeat.co/projects/github-com-olaven-serialize-xml-master)
A simple [deno](deno.land) module for serializing objects to XML. 
It is also compatible with [nodejs](https://nodejs.org). 

If you or your company is benefitting from `serialize-xml`, consider becoming a [sponsor](https://github.com/sponsors/olaven/). 
This way I can work on new features and continue to maintain it worry-free. 

## Usage 
There is _one_ concept to understand:
* `Tag` - representing a tag, like `<this></this>`

## Examples
```ts
                                //"serialize-xml" if you're using node 
import  { serialize, tag } from "https://raw.githubusercontent.com/olaven/serialize-xml/v0.4.0/mod.ts"

//<name></name>
const without_children = serialize(tag("name"))
//<name>children</name>
const without_attributes = serialize(tag("name", "children"))
//<name key="value">children</name>
const full_tag = serialize(tag("name", "children", [["key", "value"]]))

const xml = serialize(
    tag("outer", 
        [
            tag("inner", "content")
        ], 
        [
            ["key", "value"]
        ]
    )
); 

//prints: <outer><inner key="value">content</inner></outer>
console.log("serialized: ", xml);
```

### Serialze XML declarations
```ts                     
                                        //"serialize-xml" if you're using node     
import { serialize, declaration } from "https://raw.githubusercontent.com/olaven/serialize-xml/v0.4.0/mod.ts"; 
const xml = serialize(declaration([["version", "1.0"]]));

//prints: <?xml version="1.0"?>
console.log("serialized declaration", xml);
```

### Multiple parents
```typescript

/*
    <?xml version="1.0"?>
    <first_parent></first_parent>
    <second_parent>
        <child></child>
    </second_parent>
*/

const xml = serialize(
    declaration([["version", "1.0"]]), 
    tag("first_parent"), 
    tag("second_parent", [
        tag("child")
    ])
); 
```

### Alternatively, build tags by passing an object.  
```ts
                            //"serialize-xml" if you're using node 
import  { serialize } from "https://raw.githubusercontent.com/olaven/serialize-xml/v0.4.0/mod.ts"

const xml = serialize({
    name: "my_tag_name", 
    children: [
        {
            name: "sub_tag", 
            children: "inner_content_of_tag", 
            attributes: [
                ["attribute_key", "attribute_value"]
            ]
        }
    ],
    attributes: []
});

//prints: '<my_tag_name><sub_tag attribute_key="attribute_value">inner_content_of_tag</sub_tag></my_tag_name>'
console.log("serialized: ", xml); 
```

## Escaping 
`serialize-xml` will escape tag values and tag attributes 
according to [the XML spec](https://www.w3.org/TR/xml/).