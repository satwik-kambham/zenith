import { UserProfile } from "@auth0/nextjs-auth0/client";
import { useState } from "react";

export default function Generate({ authUser }: { authUser: UserProfile }) {
  const [topicInput, setTopicInput] = useState("");
  const [levelInput, setLevelInput] = useState("beginner");
  const [methods, setMethods] = useState([]);
  const [result, setResult] = useState("");
  const [path, setPath] = useState({});

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/gen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topicInput,
          level: levelInput,
          methods: methods,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setPath({
        topic: topicInput,
        level: levelInput,
        methods: methods.join(", "),
        result: data.result,
      });

      setResult(data.result);
      setTopicInput("");
      setLevelInput("beginner");
      setMethods([]);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  function handleMethodChange(e) {
    const { checked, value } = e.target;
    if (checked) {
      setMethods((prevMethods) => [...prevMethods, value]);
    } else {
      setMethods((prevMethods) =>
        prevMethods.filter((method) => method !== value)
      );
    }
  }

  async function savePath() {
    const response = await fetch("/api/addPath", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth0Id: authUser.sub,
        path: path,
      }),
    });
  }

  return (
    <div>
      <h3>Generate a learning curriculum</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="topic"
          placeholder="Enter a topic"
          value={topicInput}
          onChange={(e) => setTopicInput(e.target.value)}
        />
        <label>
          Level:
          <select
            name="level"
            value={levelInput}
            onChange={(e) => setLevelInput(e.target.value)}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </label>
        <label>
          Methods:
          <input
            type="checkbox"
            name="project-based"
            value="project-based"
            checked={methods.includes("project-based")}
            onChange={handleMethodChange}
          />
          <label htmlFor="project-based">Project-based</label>
          <input
            type="checkbox"
            name="courses"
            value="courses"
            checked={methods.includes("courses")}
            onChange={handleMethodChange}
          />
          <label htmlFor="courses">Courses</label>
          <input
            type="checkbox"
            name="books"
            value="books"
            checked={methods.includes("books")}
            onChange={handleMethodChange}
          />
          <label htmlFor="books">Books</label>
          <input
            type="checkbox"
            name="websites"
            value="websites"
            checked={methods.includes("websites")}
            onChange={handleMethodChange}
          />
          <label htmlFor="websites">Websites</label>
        </label>
        <input type="submit" value="Generate" />
      </form>
      <div>{result}</div>
      <button onClick={savePath}>Save</button>
    </div>
  );
}
