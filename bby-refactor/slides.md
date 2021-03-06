title: Life Events Refactor
theme: matmuchrapna/cleaver-ribbon
author:
    name: Michael.Grenier
    email: Grenier.Michael.R@gmail.com
output: index.html

--

# Life Events Refactor

--

Problem:
### Persistance logic was often happening in the view code
* Views which read or change the same data would often have different code to do so.
* Because of this, persistance code was often written to varying levels of performance, robustness, and clarity.
* A lot of bugs in R2 revolved around this inconsistant behavior.

--

What we did to fix this:
* All methods which communicate with a server were moved to the model layer
* Models which handled similar responsibilities were merged
* Validation is always performed by the model

--

This fixed a number of issues on the site:
* View list page requests were cut by **50%**
* View list page carousel **more reliably and efficiently** requests products
* Lists of Lists page **no longer fails** to display more than 25 products
* Lists of Lists page **shows products** on MDOT

--

### Very few unit tests
Why this is bad:
* During R2, we saw many instances where a fix to one issue would break another.
* Issues were often not found until they had been in QA for several days, forcing us to make last-minute releases
* _"Unit tests are the best documentation"_ Because there was no implimentation reference for modules, it was hard to tell if certain behavior was **intentional** or **broken**

--

How we fixed this:
* We wrote unit tests!
* We started with **37** lines of code testing **1** assertion about **1** component
* We now have **1041** lines of code testing **43** assertions about **9** components
* We're still writing unit tests -- this is a good start, but we're still a long way from the full coverage we need

--

Why we need this:
* Automated tests increase **confidence** about our changes
* Because we can spend a greater percentage of time building features instead of fixing bugs, we get **better velocity** and **more agility**
* Automated tests make manual testing more **meaningful** and **in-depth**

--

Problem:
### Some pages had missing features and broken styles

--

Lists of lists page has improved alignment and is more complete

<img src="./images/lists-of-lists-new.png" style="width: 48%;float: left;"/>
<img src="./images/lists-of-lists-old.png" style="width: 48%;float: left;margin-left:2%;"/>

--

Manage lists page has more correct styling

<img src="./images/manage-registry-item-new.png" style="width: 100%;float: left;"/>
<img src="./images/manage-registry-item-bad.png" style="width: 100%;float: left;margin-top:20px;"/>

--

MDOT view has settings drawer

<img src="./images/mdot-list-settings.png" style="width: 50%; margin: 0 auto;margin-left: 25%;"/>

--

Tooltips are now shown correctly for tablet devices:

<img src="./images/ipad-top.png" style="width: 100%;float: left;"/>
<img src="./images/ipad-top-bad.png" style="width: 100%;float: left;margin-top:20px;"/>
