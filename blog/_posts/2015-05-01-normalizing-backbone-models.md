#Normalize your Backbone models for fun and profit
One of the biggest misconceptions about Backbone.js is that the library is unopinionated.  This is untrue -- while the library leaves many things up to developer preference (templating, for example), there are some features which Backbone's creators intended to be used in a very specific manner.  One such feature is the data layer, arguably the most useful and most oft-misused part of the library.

I've been writing Backbone apps small and large more or less consistantly over the past three years, and while I have started recognizing that certain patterns smell of tech debt, but have had a lot of trouble articulating _why_ something is code smell to others.  Recently, I finally had an epiphany when I decided to read the Backbone.Model class comment:

>Backbone **Models** are the basic data object in the framework -- frequently representing a row in a table in a database on your server. A discrete chunk of data and a bunch of useful, related methods for performing computations and transformations on that data.

That's when it all made sense, **Backbone's data layer mimics a relational database.**  In short, imagine you have this data:

| id | firstName | lastName  |
|---|---|---|--|
| 1 | Richard  | Nixon  |
| 2 | Lyndon  | Johnson  |

In the SQL world, the above information would be represented as a **table** with two **rows** of information.  In Backbone, we would consider this as a **Collection** with two **Models** of data.  We could take this one step further -- if models are just table rows, then model **attributes** are really just table **columns**.

Okay fine, so Backbone saves data relationally; so what?  Well, as it happens there are a lot of well-established best practices for modeling data in a relational database.  We can apply these practices to make our apps more scalable, more maintainable, and promote code reuse.