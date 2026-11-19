import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

/**
 * Document types edited as one fixed document rather than a list.
 * Each appears as its own item in the Studio sidebar and is stored under an id
 * equal to its type name.
 */
const SINGLETON_TYPES = new Set(["ghanaPage"]);

export default defineConfig({
  name: "default",
  title: "Kimberly Ryan Website",

  projectId: "h28ja2xu",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Ghana Page")
              .id("ghanaPage")
              .child(
                S.document()
                  .schemaType("ghanaPage")
                  .documentId("ghanaPage")
                  .title("Ghana Page")
              ),
            S.divider(),
            // Hide singletons from the generated list so they can only be
            // opened (and never duplicated) through their fixed entry above.
            ...S.documentTypeListItems().filter(
              (item) => !SINGLETON_TYPES.has(item.getId() ?? "")
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
