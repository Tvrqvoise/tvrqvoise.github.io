title: CSS Guidelines
theme: matmuchrapna/cleaver-ribbon
author:
    name: Michael.Grenier
    email: Grenier.Michael.R@gmail.com
output: index.html

--

# CSS & LESS Guidelines

--

# Semantic Naming Patterns

--

# Low Specificity

--

# _Never_ use IDs, tagname selectors, or !important.  Use classes instead.

--

# Use LESS language features sparingly

--

* __ALWAYS BE CONSCIOUS__ of your generated CSS. Preprocessors can generate mountains of redundant and ugly styles, if you let them.
* Use tag nesting __SPARINGLY__. Nesting makes it hard to tell where code reuse can be, and can easily lead to gross stuff like: .my-element ui > li.my-child.
* __WATCH OUT__ for non-parametric mixins such as .foo { .bar; }. The generated CSS can have a lot of redundant code. Consider using .extend() or plain ol' CSS comma separated selectors instead.
* __PREFER__ reference imports to normal imports. There's no need to copy an entire LESS file into your generated CSS if you just want to mixin a few of its classes. 

--

# Use mixins for vendor-prefixed properties.

--

# Avoid magic numbers; use variables instead.

--

# Break a rule, leave a comment.

--

# Animations
