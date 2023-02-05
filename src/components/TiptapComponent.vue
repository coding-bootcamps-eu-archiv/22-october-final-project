<template>
  <div v-if="editor">
    <button
      @click="editor.chain().focus().toggleBold().run()"
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
    >
      bold
    </button>
    <button
      @click="editor.chain().focus().setParagraph().run()"
      :class="{ 'is-active': editor.isActive('paragraph') }"
    >
      paragraph
    </button>
    <button
      @click="editor.chain().focus().toggleBulletList().run()"
      :class="{ 'is-active': editor.isActive('bulletList') }"
    >
      bullet list
    </button>
    <button @click="setLink" :class="{ 'is-active': editor.isActive('link') }">
      setLink
    </button>
    <button
      @click="editor.chain().focus().unsetLink().run()"
      :disabled="!editor.isActive('link')"
    >
      unsetLink
    </button>
    <button
      @click="editor.chain().focus().undo().run()"
      :disabled="!editor.can().chain().focus().undo().run()"
    >
      undo
    </button>
    <button
      @click="editor.chain().focus().redo().run()"
      :disabled="!editor.can().chain().focus().redo().run()"
    >
      redo
    </button>
  </div>
  <editor-content
    class="description-field"
    v-model="content"
    :editor="editor"
  />
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
    };
  },

  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value;

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return;
      }

      this.editor.commands.setContent(value, false);
    },
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Link.configure({
          openOnClick: false,
        }),
      ],
      content: "<p>Texteingabe</p>",
      onUpdate: () => {
        // HTML
        this.$emit("update:modelValue", this.editor.getHTML());

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
    });
  },
  methods: {
    setLink() {
      const previousUrl = this.editor.getAttributes("link").href;
      const url = window.prompt("URL", previousUrl);

      // cancelled
      if (url === null) {
        return;
      }

      // empty
      if (url === "") {
        this.editor.chain().focus().extendMarkRange("link").unsetLink().run();

        return;
      }

      // update link
      this.editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    },
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>
<style scoped>
.ProseMirror-focused:focus-visible {
  outline: none;
}

button {
  display: inline-block;
  font-family: Source Sans Pro;
  font-weight: 600;
  font-size: 1rem;
  border: 3px solid #6a1cc3;
  color: #6a1cc3;
  background: #fbfbfb;
  box-shadow: 2px 2px 0px 0px #6a1cc3;
  padding: 5px 10px 5px 10px;
  cursor: pointer;
  transition: all 0.5s;
}

button:hover {
  background-color: #6a1cc3;
  color: #fbfbfb;
}

.description-field:focus {
  border: 5x dashed red;
}
</style>
