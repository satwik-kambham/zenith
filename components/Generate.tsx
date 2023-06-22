import { UserProfile } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Generate({ authUser }: { authUser: UserProfile }) {
  const [topicInput, setTopicInput] = useState("");
  const [levelInput, setLevelInput] = useState("beginner");
  const [methods, setMethods] = useState([]);
  const [result, setResult] = useState("");
  const [path, setPath] = useState({});

  const router = useRouter();

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

    if (response.ok) {
      router.push("/");
    }
  }

  return (
    <div
      className={`antialiased bg-gray-900 min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip`}
    >
      <header className="flex items-center sm:justify-between px-16 pt-8 pb-4 bg-gray-900 text-white justify-center">
        <div className="flex items-center">
          <img src="/favicon.ico" alt="Logo" className="h-8 w-8 mr-2" />
          <h1 className="text-xl font-semibold">Zenith</h1>
        </div>
      </header>
      <div className="text-center p-4 text-white pt-16">
        <Link
          className="bg-gradient-to-r from-blue-500 to-teal-400 text-white py-2 px-4 rounded inline-block w-full sm:w-auto mb-4"
          href="/"
        >
          Back to Dashboard
        </Link>
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Generate a learning curriculum
          </h3>
          <form onSubmit={onSubmit} className="mb-4">
            <input
              type="text"
              name="topic"
              placeholder="Enter a topic"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              className="block w-full bg-gray-800 text-white rounded-md py-2 px-3 mb-2"
            />
            <label className="block mb-2">
              Level:
              <select
                name="level"
                value={levelInput}
                onChange={(e) => setLevelInput(e.target.value)}
                className="block w-full bg-gray-800 text-white rounded-md py-2 px-3"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </label>
            <label className="block mb-2">
              Methods:
              <div className="flex flex-col sm:flex-row items-start">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="project-based"
                    value="project-based"
                    checked={methods.includes("project-based")}
                    onChange={handleMethodChange}
                    id="project-based"
                    className="form-checkbox text-blue-500 h-4 w-4 mr-1"
                  />
                  <label htmlFor="project-based" className="mr-4">
                    Project-based
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="courses"
                    value="courses"
                    checked={methods.includes("courses")}
                    onChange={handleMethodChange}
                    id="courses"
                    className="form-checkbox text-blue-500 h-4 w-4 mr-1"
                  />
                  <label htmlFor="courses" className="mr-4">
                    Courses
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="books"
                    value="books"
                    checked={methods.includes("books")}
                    onChange={handleMethodChange}
                    id="books"
                    className="form-checkbox text-blue-500 h-4 w-4 mr-1"
                  />
                  <label htmlFor="books" className="mr-4">
                    Books
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="websites"
                    value="websites"
                    checked={methods.includes("websites")}
                    onChange={handleMethodChange}
                    id="websites"
                    className="form-checkbox text-blue-500 h-4 w-4 mr-1"
                  />
                  <label htmlFor="websites">Websites</label>
                </div>
              </div>
            </label>

            <input
              type="submit"
              value="Generate"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full sm:w-auto cursor-pointer"
            />
          </form>
          <div className="text-white">{result}</div>
          <button
            onClick={savePath}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
