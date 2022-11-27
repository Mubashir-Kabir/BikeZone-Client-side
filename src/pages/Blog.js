import React from "react";
import useTitle from "../hooks/useTitle";

const Blog = () => {
  useTitle("Blog");

  return (
    <section className="">
      <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
        <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">
          Asked Questions
        </h2>
        <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-gray-300">
          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
              What are the different ways to manage a state in a React
              application?
            </summary>
            <div className="px-4 pb-4">
              <p>
                There are four main types of state need to properly manage in
                React apps: <br /> 1.Local state 2.Global state 3.Server state
                4.URL state <br />
                Local state is most often managed in React using the useState
                hook. <br />
                Global state is necessary when we want to get and update data
                anywhere in our app, or in multiple components at least. <br />
                Server state is a simple concept, but can be hard to manage
                alongside all of our local and global UI state. <br />
                URL state – Data that exists on our URLs, including the pathname
                and query parameters.
              </p>
            </div>
          </details>
          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
              How does prototypical inheritance work?
            </summary>
            <div className="px-4 pb-4">
              <p>
                The Prototypal Inheritance is a feature in javascript used to
                add methods and properties in objects. It is a method by which
                an object can inherit the properties and methods of another
                object. Traditionally, in order to get and set the [[Prototype]]
                of an object, we use Object. getPrototypeOf and Object
              </p>
            </div>
          </details>
          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
              What is a unit test? Why should we write unit tests?
            </summary>
            <div className="px-4 pb-4 space-y-2">
              <p>
                What is meant by unit testing? A unit test is a way of testing a
                unit - the smallest piece of code that can be logically isolated
                in a system. In most programming languages, that is a function,
                a subroutine, a method or property. The isolated part of the
                definition is important. <br />
                They enable you to catch bugs early in the development process.
                Automated unit tests help a great deal with regression testing.
                They detect code smells in your codebase. For example, if you're
                having a hard time writing unit tests for a piece of code, it
                might be a sign that your function is too complex.
              </p>
            </div>
          </details>
          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
              React vs. Angular vs. Vue?
            </summary>
            <div className="px-4 pb-4 space-y-2">
              <p>
                React is more suitable for intermediate to advanced JavaScript
                developers who are familiar with concepts from ES6 and up, while
                Angular favors those same developers who are also familiar with
                TypeScript. <br />
                Vue might be the best choice if you’re a newer developer and not
                as familiar with advanced JavaScript concepts, while React is
                quite well suited for experienced programmers and developers who
                have worked with object-oriented JavaScript, functional
                JavaScript, and similar concepts. <br />
                Vue was created by a developer who formerly worked on Angular
                for Google, so that’s another thing to keep in mind, though that
                wouldn’t have a huge impact on your decision.
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
};

export default Blog;
