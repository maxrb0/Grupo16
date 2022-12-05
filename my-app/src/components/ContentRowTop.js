import ContentRowPanels from "./contentRowMovies/ContentRowPanels";
import CategoriesInDb from "./CategoriesInDb";
import LastMovieInDb from "./LastMovieInDb";


function ContentRowTop() {
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard El Mundo de las Camisetas</h1>
      </div>

        <ContentRowPanels />
        <div className="row">
        <LastMovieInDb />
        <CategoriesInDb />
      </div>
    </div>
  );
}

export default ContentRowTop;
