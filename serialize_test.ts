import { serialize, Tag, tag, declaration } from "./mod.ts";
import { assertEquals } from "./deps.ts";

const { test } = Deno;

test("can serialize tag", () => {
  const tag: Tag = {
    name: "my_tag_name",
    children: [
      {
        name: "sub_tag",
        children: "inner_content_of_tag",
        attributes: [], 
      },
    ],
    attributes: [],
  };

  const actual = serialize(tag);
  const expected =
    `<my_tag_name><sub_tag>inner_content_of_tag</sub_tag></my_tag_name>`;

  assertEquals(actual, expected);
});

test("serializing includes attributes", () => {
  const tag: Tag = {
    name: "tag",
    children: [],
    attributes: [
      ["key1", "value1"],
      ["key2", "value2"],
    ],
  };

  const actual = serialize(tag);
  const expected = `<tag key1="value1" key2="value2"></tag>`;
  assertEquals(actual, expected);
});

test("serializing includes attributes on children", () => {
  const tag: Tag = {
    name: "parent",
    children: [
      {
        name: "child",
        children: [],
        attributes: [
          ["child_key", "child_value"],
        ], 
      },
    ],
    attributes: [
      ["parent_key", "parent_value"],
    ],
  };

  const actual = serialize(tag);
  const expected =
    `<parent parent_key="parent_value"><child child_key="child_value"></child></parent>`;
  assertEquals(actual, expected);
});

test("serializing includes attributes on children _and_ string child", () => {
  const tag: Tag = {
    name: "parent",
    children: [
      {
        name: "child",
        children: "inner child value",
        attributes: [
          ["child_key", "child_value"],
        ],
      },
    ],
    attributes: [
      ["parent_key", "parent_value"],
    ],
  };

  const actual = serialize(tag);
  const expected =
    `<parent parent_key="parent_value"><child child_key="child_value">inner child value</child></parent>`;
  assertEquals(actual, expected);
});

test("serializing includes attributes on children _and_ string child", () => {
  const tag: Tag = {
    name: "parent",
    children: [
      {
        name: "first_child",
        children: "first_val",
        attributes: [],
      },
      {
        name: "second_child",
        children: "second_val",
        attributes: [],
      },
    ],
    attributes: [],
  };

  const actual = serialize(tag);
  const expected =
    `<parent><first_child>first_val</first_child><second_child>second_val</second_child></parent>`;
  assertEquals(actual, expected);
});

test("Test the same example as in readme", () => {

  const t: Tag = {
    name: "my_tag_name",
    children: [
      {
        name: "sub_tag",
        children: "inner_content_of_tag",
        attributes: [
          ["attribute_key", "attribute_value"],
        ],
      },
    ],
    attributes: [],
  };

  const xml = serialize(t);

  assertEquals(
    xml,
    '<my_tag_name><sub_tag attribute_key="attribute_value">inner_content_of_tag</sub_tag></my_tag_name>',
  );
});


test("Attribtes are optional", () => {

  //NOTE: no attributes defined 
  const xml = serialize(tag("tag", "content"))

  assertEquals(xml, `<tag>content</tag>`);
})

test("Simple combination with with object API", () => {

  const xml = serialize({
    name: "outer", 
    children: [
      tag("first_inner", "content"), 
      tag("second_inner", "content", [["key", "value"]]),
    ], 
    attributes: [], //NOTE: not nececcary with `.tag()`
  //NOTE: not nececcary with `.tag()`
  })

  assertEquals(xml, `<outer><first_inner>content</first_inner><second_inner key="value">content</second_inner></outer>`)
})

test("More complex example with functional API", () => {

  const xml = serialize(
    tag("outer", [
      tag("inner", "inner_content", [
        ["first_key", "first_value"],
        ["second_key", "second_value"],
      ]),
    ])
  );

  assertEquals(xml, `<outer><inner first_key="first_value" second_key="second_value">inner_content</inner></outer>`);
})

test("Another combining of functional and object approach", () => {

  const xml = serialize(
    tag("outer", [
      {
        name: "inner", 
        children: "inner_content", 
        attributes: [
          ["first_key", "first_value"],
          ["second_key", "second_value"],
        ],
      }
    ])
  );
    
  assertEquals(xml, `<outer><inner first_key="first_value" second_key="second_value">inner_content</inner></outer>`);
}); 

test("Can specify declaration through serialize", () => {

  const xml = serialize(declaration([]));
  const expected = '<?xml ?>'; 
  assertEquals(xml, expected);
});

test("Declaration example in readme", () => {

  const xml = serialize(declaration([["version", "1.0"]]));
  const expected = '<?xml version="1.0"?>';
  assertEquals(xml, expected);
});

test("Second example in README works as written", () => {

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

  assertEquals(xml, `<outer key="value"><inner>content</inner></outer>`)
});

test("Tiny examples from second in from README.md works", () => {

  //<name></name>
  const without_children = serialize(tag("name"));
  //<name>children</name>
  const without_attributes = serialize(tag("name", "children"));
  //<name key="value">children</name>
  const full_tag = serialize(tag("name", "children", [["key", "value"]]));

  assertEquals(without_children, `<name></name>`); 
  assertEquals(without_attributes, `<name>children</name>`); 
  assertEquals(full_tag, `<name key="value">children</name>`)
});


test("Chaining example from readme", () => {

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

  assertEquals(xml, '<?xml version=\"1.0\"?><first_parent></first_parent><second_parent><child></child></second_parent>');
});

test("children can be omitted with tag function", () => {
  
  const xml = serialize(tag("name"));
  assertEquals(xml, `<name></name>`);
});

test("Serialize function can chain parents", () => {

  const xml = serialize(
      tag("first_parent"),
      tag("second_parent")
  );

  assertEquals(xml, `<first_parent></first_parent><second_parent></second_parent>`)
});

test("Serialize function can chain declarations and tags", () => {

  const xml = serialize(
      declaration([["version", "1.0"]]),
      tag("tag")
  );

  assertEquals(xml, `<?xml version="1.0"?><tag></tag>`)
});

test("Serialize function can chain declarations and tags with children", () => {

  const xml = serialize(
      declaration([["version", "1.0"]]),
      tag("parent", [
          tag("child")
      ])
  );

  assertEquals(xml, `<?xml version="1.0"?><parent><child></child></parent>`)
});

test("Serialize function does escape tag attributes", () => {

  const xml = serialize(
    tag("name", [], [["key", "&"]])
  ); 

  assertEquals(
    xml, `<name key="&amp;"></name>`
  );
});

test("Serialize function does escape tag values", () => {

  const xml = serialize(
    tag("name", "<")
  ); 

  assertEquals(
    xml, `<name>&lt;</name>`
  )
}); 

test("Escaping works with child tags", () => {

  const xml = serialize(
    tag("parent", [
      tag("name", "&")
    ])
  ); 

  assertEquals(xml, `<parent><name>&amp;</name></parent>`)
})