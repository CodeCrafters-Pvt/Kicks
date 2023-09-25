import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PropTypes from "prop-types";

export const CardSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, index) => (
      <div className="w-full px-2 mb-4 " key={index}>
        <div className="bg-white rounded-lg shadow-md p-4 h-full">
          <div className="mx-auto w-[50%] mb-5">
            <Skeleton height={"13vh"} />
          </div>
          <p className="text-md mb-2">
            <Skeleton width={"30%"} />
          </p>
          <p className="text-xs  mb-4">
            <Skeleton width={"40%"} count={3} />
          </p>
        </div>
      </div>
    ));
};

CardSkeleton.propTypes = {
  card: PropTypes.element,
};
