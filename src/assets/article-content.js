// src/assets/article-content.js
const articles = [
  {
    name: "react-props-and-styling",
    title: "Understanding React Props and Styling",
    image: "https://picsum.photos/seed/reactprops/800/600",
    content: [
      "Props (short for properties) allow you to pass data between components. They are read-only and essential for component reusability.",
      "Example:\nfunction Welcome(props) {\n  return <h1>Hello, {props.name}</h1>;\n}",
      "React supports multiple styling approaches: inline styles, CSS files, CSS Modules, and styled-components.",
      "Inline Style Example:\nconst style = { color: 'blue' };\n<p style={style}>Styled Text</p>",
      "Best Practice: Use CSS Modules or Tailwind CSS for maintainable styling in larger applications."
    ]
  },
  {
    name: "react-functional-components",
    title: "React Functional Components",
    image: "https://picsum.photos/seed/functional/800/600",
    content: [
      "Functional components are simple JavaScript functions that return JSX.",
      "They are stateless by default but can use hooks like useState and useEffect.",
      "Example:\nfunction HelloWorld() {\n  return <h1>Hello, World!</h1>;\n}",
      "They are preferred in modern React apps for simplicity and performance.",
      "Hooks like useState allow functional components to manage state without converting to class components."
    ]
  },
  {
    name: "react-component-lifecycle",
    title: "React Component Lifecycle",
    image: "https://picsum.photos/seed/lifecycle/800/600",
    content: [
      "Class components have lifecycle methods: mounting, updating, unmounting.",
      "Key methods include: componentDidMount, componentDidUpdate, componentWillUnmount.",
      "Functional components use the useEffect hook to mimic lifecycle behavior.",
      "Example:\nuseEffect(() => {\n  console.log('Mounted');\n  return () => console.log('Unmounted');\n}, []);",
      "Understanding the lifecycle is crucial for managing side effects and subscriptions."
    ]
  },
  {
    name: "react-routing-basics",
    title: "React Router Basics",
    image: "https://picsum.photos/seed/routing/800/600",
    content: [
      "React Router allows navigation between pages without a page reload.",
      "Set up routes using BrowserRouter, Routes, and Route components.",
      "Example:\n<Routes>\n  <Route path=\"/\" element={<Home />} />\n  <Route path=\"/about\" element={<About />} />\n</Routes>",
      "Use Link component for navigation:\n<Link to=\"/about\">About</Link>",
      "React Router v6 introduces nested routes and the useParams hook for dynamic routing."
    ]
  }
  // Article 05 is NOT here - it will be hardcoded in ArticleList.jsx with a broken link
];

export default articles;