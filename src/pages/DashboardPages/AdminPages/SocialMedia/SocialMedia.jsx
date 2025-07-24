import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaLinkedin, FaRegEdit } from "react-icons/fa";
import UpdateSettings from "../UpdateSettings/UpdateSettings";
import { useState } from "react";
import useWebsiteInfo from "../../../../hooks/useWebsiteInfo/useWebsiteInfo";
import Loader from "../../../../components/Loader/Loader";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const SocialMedia = () => {
  const [isUpdateInfo, setIsUpdateInfo] = useState("");

  const { websiteInfo, isWebsiteInfoLoading } = useWebsiteInfo();

  if (isWebsiteInfoLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const socialLinks = [
    { name: "Facebook", icon: <FaFacebook size={24} />, link: websiteInfo?.facebook },
    { name: "Instagram", icon: <FaInstagram size={24} />, link: websiteInfo?.instagram },
    { name: "YouTube", icon: <FaYoutube size={24} />, link: websiteInfo?.youtube },
    { name: "TikTok", icon: <FaTiktok size={24} />, link: websiteInfo?.tiktok },
    { name: "LinkedIn", icon: <FaLinkedin size={24} />, link: websiteInfo?.linkedin },
  ];

  return (
    <div className="w-full h-full relative bg-gray-100 dark:bg-gray-800 rounded">
      <Helmet>
        <title>FreeFeel | Dashboard - Social Media</title>
        <meta name="description" content="Explore social media on the FreeFeel Dashboard." />
      </Helmet>
      {isUpdateInfo ? (
        <div>
          <UpdateSettings isUpdateInfo={isUpdateInfo} setIsUpdateInfo={setIsUpdateInfo} />
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="px-5 py-3 border-b border-dashed border-gray-300 dark:border-gray-600 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Social Media</h3>
            <button
              onClick={() => setIsUpdateInfo("Social Media")}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              <FaRegEdit />
              <span className="font-medium">Update</span>
            </button>
          </div>

          {/* Social Links */}
          <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {socialLinks.map(({ name, icon, link }, index) => (
              <SocialMediaCard key={index} name={name} icon={icon} link={link} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const SocialMediaCard = ({ name, icon, link }) => (
  <Link
    to={link}
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col items-center justify-center gap-3 bg-white dark:bg-black text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-500 hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 p-4 rounded-lg"
  >
    <div className="text-3xl">{icon}</div>
    <span className="font-medium">{name}</span>
  </Link>
);

export default SocialMedia;
