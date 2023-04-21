import { useState } from "react";

function App() {
  ClassicEditor.create(document.querySelector("#editor")).catch((error) => {
    console.error(error);
  });
  return (
    <>
      <div id="editor"></div>
    </>
  );
}

export default App;
