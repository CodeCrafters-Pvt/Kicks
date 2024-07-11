import { Link } from "react-router-dom";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  const Column = ({ title, rows }) => {
    return (
      <div className="flex flex-col gap-2">
        <span className="text-lg mb-2 font-bold">{title}</span>
        {rows.map((row,index) => (
          <Link to={row.to} key={index}>
            <span className=" ">{row.text}</span>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-black text-white text-sm">
      <div className=" flex mx-8 justify-evenly">
        <div className="ml-6 my-14 w-1/3">
          <span className="text-lg font-bold">Logo</span>
          <p className="mt-4  w-1/2">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </p>
          <div className=" flex gap-2 mt-4 text-lg">
            <a href=""><FaFacebook /></a>
            <a href=""><FaLinkedin /></a>
            <a href=""><FaTwitter /></a>
            <a href=""><FaInstagram /></a>
          </div>
        </div>
        <div className=" flex gap-10 my-14">
          <Column
            title="About"
            rows={[
              { to: "/about-us", text: "About Us" },
              { to: "/conatct-us", text: "Contact Us" },
            ]}
          />
          <Column
            title="Collections"
            rows={[
              { to: "/men", text: "Men" },
              { to: "/women", text: "Women" },
              { to: "/kids", text: "Kids" },
            ]}
          />
          <Column
            title="Support"
            rows={[
              { to: "/faq", text: "Frequently Asked Questions" },
              { to: "/returns-exchanges", text: "Returns and Exchanges" },
              { to: "/shipping-delivery", text: "Shipping and Delivery" },
              { to: "/size-chart", text: "Size Chart" },
              { to: "/track-order", text: "Track Order" },
            ]}
          />
          <Column
            title="Legal"
            rows={[
              { to: "/terms-of-service", text: "Terms of Service" },
              { to: "/privacy-policy", text: "Privacy Policy" },
              { to: "/cookies-policy", text: "Cookies Policy" },
              { to: "/data-processing", text: "Data Processing" },
            ]}
          />
        </div>
      </div>
      
      <div className="relative bottom-10 mt-12 text-center bg-black">
      <hr />
        <h4 className="mt-8">All Rights Reserved | 2023</h4>
      </div>
    </div>
  );
}
