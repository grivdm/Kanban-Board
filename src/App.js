import "./App.scss";
import ProjectPage from "./pages/project-page/ProjectPage";

function App() {
  return (
    <div className="app">
      <h1>Kanban board</h1>
      <ProjectPage />
      <p>made with love by <a href="https://github.com/grivdm">grivdm</a></p>
    </div>
  );
}

export default App;
