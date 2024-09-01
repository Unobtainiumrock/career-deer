# Tasks

1. **Resolve the compilation warnings for the font-end code.**

```
[1] Compiled with warnings.
[1] 
[1] ./src/containers/SignUp/actions.js
[1]   Line 1:   'googleSignUp' is defined but never used      no-unused-vars
[1]   Line 52:  'createdUser' was used before it was defined  no-use-before-define
[1] 
[1] ./src/containers/Board/data-mapper.js
[1]   Line 16:  Unnecessarily computed property ['on-site'] found  no-useless-computed-key
[1] 
[1] ./src/components/ProgressTile/ProgressTile.js
[1]   Line 1:  'Component' is defined but never used  no-unused-vars
[1]   Line 3:  'Col' is defined but never used        no-unused-vars
[1] 
[1] ./src/components/ProgressTile/JobTile.js
[1]   Line 10:  'selectUpdateJob' is defined but never used  no-unused-vars
[1] 
```

2. **Track down the deprecation warning for http_parser on backend**

```
[1] (node:646665) [DEP0111] DeprecationWarning: Access to process.binding('http_parser') is deprecated.
[1] (Use `node --trace-deprecation ...` to show where the warning was created)
```

Adding the --trace-deprecation flag didn't work. It's most likely due to a plethora of outdated or mismatched packages.

3. **Convert Over From Traditional Redux to more modern Redux Toolkit (RTK)**

A lot has changed since 2018 w.r.t. Redux. Lots of boilerplate can be eliminated simply by switching over to more modern Redux. I think
it's best to first become more familiar with the old code architecture prior to this though.

4. **Draft up and document user stories and application flow**

There is a lot of room to improve the application in terms of how users interact with it. Some drafting would be useful/

5. **Break Apart the Front End and Back End API's and make the application less monolithic**

6. **Set up a CI/CD Pipeline with Docker**

7. **Deploy to AWS & link up to the registered domain**

8. **Inject the platform with lots of newly acquired data science and machine learning skills**

9. **Consider convertion to a relational database over mongodb**

10. **Find fresh sources of data to inject into the platform**


# For Me

I need to incorproate my following sentiment somewhere into why I am reviving Career Deer:

Lastly, what differentiated this from other platforms was the combination of aggregating job data and tracking them in a Trello board, all in one. Since that time, others have used our idea and monetized it. My main mission is not only to make Career Deer phenomenally better than other options but also free, as a big 'fuck you' to all the greedy people who only ever cared about making money and selling users' data for profit.