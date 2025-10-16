# Welcome to HTML!  HTML for Beginners 🚀

This guide will teach you the very basics of HTML. HTML stands for **H**yper**T**ext **M**arkup **L**anguage, and it's the standard language for creating web pages.

---

## What You Will Learn

*   What HTML is and why it's important.
*   The basic structure of an HTML document.
*   The most common HTML tags for creating content.
*   How to put it all together in a simple webpage.

---

## 1. What is HTML?

Think of HTML as the **skeleton** of a webpage 🦴. It provides the structure and content, like text, images, and links. It's not a programming language; it's a "markup" language, which means it uses tags to "mark up" and define the content.

## 2. The Basic Structure of an HTML Document

Every HTML document has a basic structure that looks like this:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My First Webpage</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first webpage.</p>
</body>
</html>
```

> #### Let's break this down:
>
> *   `<!DOCTYPE html>`: This declaration defines that this document is an HTML5 document. It's always the first thing in your HTML file.
> *   `<html>`: This is the root element of an HTML page. All other elements go inside of this.
> *   `<head>`: This element contains meta-information about the HTML page, such as the title that appears in the browser tab. It's not visible on the page itself.
> *   `<title>`: This sets the title of the page.
> *   `<body>`: This element contains the visible page content that is displayed in the browser.

## 3. HTML Elements and Tags

HTML uses "tags" to define elements. Tags are keywords surrounded by angle brackets, like `<html>`.

*   Tags usually come in pairs, like `<p>` and `</p>`.
*   The first tag in a pair is the **opening tag**, and the second tag is the **closing tag**.
*   The closing tag is written like the opening tag, but with a forward slash `/` inserted before the tag name.

> **💡 Tip:** Some tags are "self-closing", like the `<img>` tag for images. We'll see that later!

## 4. Common HTML Tags

Here are some of the most common HTML tags you'll use:

### Headings 🗣️

Headings are used to define titles and subtitles. `<h1>` is the most important heading, and `<h6>` is the least important.

```html
<h1>This is a Heading 1</h1>
<h2>This is a Heading 2</h2>
<h3>This is a Heading 3</h3>
```

### Paragraphs 📝

The `<p>` tag is used to define a paragraph of text.

```html
<p>This is a paragraph of text. You can write as much as you want here.</p>
```

### Bold and Italic Text

*   To make text **bold**, use the `<strong>` tag.
*   To make text *italic*, use the `<em>` tag.

```html
<p>This is a <strong>bold</strong> word, and this is an <em>italic</em> word.</p>
```

### Lists 📋

HTML provides two types of lists:

*   **Unordered Lists** (`<ul>`): These are bullet-point lists.
*   **Ordered Lists** (`<ol>`): These are numbered lists.

Each item in a list is defined with the `<li>` (list item) tag.

**Unordered List Example:**

```html
<ul>
    <li>🍎 Apples</li>
    <li>🍊 Oranges</li>
    <li>🍌 Bananas</li>
</ul>
```

**Ordered List Example:**

```html
<ol>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
</ol>
```

### Links 🔗

Links are created with the `<a>` (anchor) tag. The `href` attribute specifies the URL the link goes to.

```html
<a href="https://www.google.com">This is a link to Google</a>
```

### Images 🖼️

Images are embedded with the `<img>` tag. This is a self-closing tag, so it doesn't need a closing tag.

The `src` attribute specifies the path to the image, and the `alt` attribute provides alternate text for the image if it cannot be displayed.

```html
<img src="your-image-url.jpg" alt="A description of the image">
```

---

## 5. Putting It All Together

Here's a complete example that uses everything we've learned:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Awesome Webpage</title>
</head>
<body>

    <h1>Welcome to My Webpage</h1>

    <p>This is a webpage I created to learn HTML. It's a lot of fun!</p>

    <h2>My Favorite Fruits</h2>
    <ul>
        <li>Apples</li>
        <li>Oranges</li>
        <li>Bananas</li>
    </ul>

    <h2>My To-Do List</h2>
    <ol>
        <li>Learn HTML</li>
        <li>Build a webpage</li>
        <li>Have fun!</li>
    </ol>

    <h2>A Link to a Helpful Resource</h2>
    <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">MDN HTML Documentation</a>

    <h2>An Image</h2>
    <img src="https://via.placeholder.com/150" alt="A 150x150 placeholder image">

</body>
</html>
```

I hope this guide helps you get started with HTML! Happy coding! 🎉