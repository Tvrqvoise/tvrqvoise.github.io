---
layout: post
title:  "What I want from Backbone.Model"
date:   2014-08-20 17:45:00
tags: JavaScript Backbone MVC
---
Over the past couple of projects I've done I've found myself reaching for Backbone time, and time again.  Backbone is the kind of tool that I like: so simple, I can read the source code in an afternoon; so configurable, I can attach to any backend, read any data source, and display it how I like.  More and more, though, I've found myself having to write a large amount of custom code to handle a few specific situations.

## 1. Nested Models

The lack of in-built support for nested models is the source of a massive number of stack overflow questions, and is one of the most difficult things for people new to Backbone to become comfortable with.  The [official party line][flat-model] seems to be that the reason for this is because you aren't *supposed* to have deep data structures.  Chances are though - if you're interfacing with a RESTful backend (a problem Backbone aims to solve), it's going to be returning nested data models, and you're going to need to show relationships between them somehow. Let's say your service returns data like this:

{% highlight javascript %}
// GET http://mydomain.com/api/user/123/

{
    "name" : "Michael Grenier",
    "occupation" : "PROGRAMMER",
    "addresses" : [
        {
            "state" : "DC",
            "city" : "Washington",
            "zip" : "20500",
            "street" : "1600 Pennsylvania Ave NW",
            "apartment" : null,
            "phones" : [
                "15551234567",
                "15557654321"
            ]
        }
    ]
}
{% endhighlight %}

There are a few ways of handling this.  You can, of course, just deal with the POJO objects directly:

{% highlight javascript %}
var UserModel = new Backbone.Model.extend({/* ... */});

var user = new UserModel();
user.on('sync', function(){
        this.get('addresses')[0].apartment = 'Suite 3B';
    }).fetch();
{% endhighlight %}

As you can probably already see, there are problems with this approach.  In terms of api usage, it's weird - you start off with getter / setter, but you end up just traversing the object the same as if you'd just used ```attributes```.  Because you are accessing a naked object, you lose all that Backbone goodness too - no validation to check your changes, and no events to announce them.

So, let's try again.  This time, instead of modifying the properties, let's convert nested objects into new models:

{% highlight javascript %}
var UserModel = new Backbone.Model.extend({
    /* ... */
    parse : function(data){
        data.addresses = new Backbone.Collection(data.addresses);
        return data;
    }
});

var user = new UserModel();
user.on('sync', function(){
        // Try adding an apartment
        this.get('addresses').at(0).set({ "apartment" : "Suite 3B" });
    }).fetch();
{% endhighlight %}

This works better, and now it feels a lot more Backbone.

## 2. Collections as First-Level Citizens

## 3. Type Enforcement

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

Check out the [Jekyll docs][jekyll] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll’s dedicated Help repository][jekyll-help].

[flat-model]:   http://rocketmodule.com/blog/backbonejs-opinionated-or-why-using-nested-models-and-collections-backbone-so-hard
