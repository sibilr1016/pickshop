// import { Pagination } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";

// const Paginate = ({ pages, page, isAdmin = false, keyword="" }) => {
//   return (
//     pages > 1 && (
//       <Pagination>
//         {[...Array(pages).keys()].map((x) => (
//           <LinkContainer
//             key={x + 1}
//             to={!isAdmin ? keyword ? `/search/${keyword}/page/${x+1}` :`/page/${x + 1}` : `/admin/productlist/${x + 1}`}
//           >
//             <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
//           </LinkContainer>
//         ))}
//       </Pagination>
//     )
//   );
// };

// export default Paginate;

import { Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    if (!isAdmin) {
      if (keyword) {
        navigate(`/search/${keyword}/page/${pageNumber}`);
      } else {
        navigate(`/page/${pageNumber}`);
      }
    } else {
      navigate(`/admin/productlist/${pageNumber}`);
    }
  };

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item
            key={x + 1}
            active={x + 1 === page}
            onClick={() => handlePageChange(x + 1)}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
