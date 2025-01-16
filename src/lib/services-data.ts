import { StaticImageData } from "next/image";
import graphicDesignIcon from "@/assets/services/graphicDesignIcon.png";
import mobileDevIcon from "@/assets/services/mobileDevIcon.png";
import webDevIcon from "@/assets/services/webDevIcon.png";
import eCommLogo from "@/assets/services/eCommLogo.png";
import digitalMarkLogo from "@/assets/services/digitalMarkLogo.png";
import seoLogo from "@/assets/services/seoLogo.png";

// main card center image imports/ faulty images/
// import seo from "@/assets/services/seo.png";
// import mobileDev from "@/assets/services/mobileDev.png";
// import webDev from "@/assets/services/webDev.png";
// import eComm from "@/assets/services/eComm.png";
// import digitalMarketing from "@/assets/services/digitalMarketing.png";
// import graphicDesign from "@/assets/services/graphicDesign.png";

// main card center image imports/ corected images/
import seo from "@/assets/services/main/seo.png";
import mobileDev from "@/assets/services/main/mobileDev.png";
import webDev from "@/assets/services/main/webDev.png";
import eComm from "@/assets/services/main/eComm.png";
import digitalMarketing from "@/assets/services/main/digitalMarketing.png";
import graphicDesign from "@/assets/services/main/graphicDesign.png";


////////////////////////////////////////////////////////////////////////////////////
// details page cover images
import graphicDesignCover from "@/assets/services/info/graphicDesign.jpg";
import digitalMarketingCover from "@/assets/services/info/digitalMarketing.jpg";
import eCommCover from "@/assets/services/info/eComm.jpg";
import mobileDevCover from "@/assets/services/info/mobileDev.jpg";
import seoCover from "@/assets/services/info/seo.jpg";
import webDevCover from "@/assets/services/info/webDev.jpg";

export interface Capability {
  heading: string;
  content: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  icon: StaticImageData;
  image: StaticImageData;
  coverImage: StaticImageData;
  capability: Capability[];
}

export const services: Service[] = [
  {
    id: "graphic-design",
    title: "Graphic Design",
    description:
      "Create visually stunning designs tailored to your brand, ensuring a professional and creative edge in every project.",
    detailedDescription: `We understand the power of exceptional design in telling your story. Great designs inspire, connect, & leave a lasting impression and that’s exactly what Novanectar Services Private Limited deliver. From striking logos to captivating social media graphics, we transform ideas into visuals that elevate your brand’s identity and presence. Whether you're starting fresh or reimagining your identity, our creative team works tirelessly to craft designs that resonate, engage, and inspire your audience.`,
    icon: graphicDesignIcon,
    image: graphicDesign,
    coverImage: graphicDesignCover,
    capability: [
      {
        heading: "Logo Design",
        content:
          "Crafting distinctive, timeless logos that capture the essence of your brand’s personality and vision, which contributes to attracting the client's attention.",
      },
      {
        heading: "Business Card Design",
        content:
          "Designing professional, visually appealing, and authentic business cards to make your first impression impactful.",
      },
      {
        heading: "Social Media Graphics",
        content:
          "Creating vibrant, share-worthy visuals tailored for enhanced engagement on all social media platforms.",
      },
      {
        heading: "Packaging Design",
        content:
          "Developing innovative and attractive packaging that highlights your product and draws customer attention.",
      },
      {
        heading: "Brochure/Flyer Design",
        content:
          "Designing detailed, eye-catching brochures and flyers that effectively communicate your message to your target audience.",
      },
      {
        heading: "Website Graphics",
        content:
          "Crafting visually compelling graphics to enhance your website’s usability and aesthetic appeal.",
      },
    ],
  },
  {
    id: "mobile-development",
    title: "App Development",
    description:
      "Build innovative and user-friendly mobile applications to meet your business needs and enhance customer engagement.",
    detailedDescription:
      "In a world dominated by mobile-first experiences, Novanectar Services Private Limited brings your app ideas to life with unmatched creativity and precision. We specialize in crafting innovative, high-performance mobile applications tailored to your business goals. From captivating designs to cutting-edge functionality, our apps are built to impress, engage, and scale effortlessly. Our ultimate goal is to turn your vision into a seamless digital experience that connects, captivates, and drives success.",
    icon: mobileDevIcon,
    image: mobileDev,
    coverImage: mobileDevCover,
    capability: [
      {
        heading: "Android App Development",
        content:
          "Custom, high-performing Android applications tailored for seamless functionality and scalability.",
      },
      {
        heading: "iOS App Development",
        content:
          "Secure, user-friendly iOS apps crafted for exceptional experiences",
      },
      {
        heading: "Native Application Development",
        content:
          "Platform-specific apps ensuring optimal speed and performance.",
      },
      {
        heading: "Cross-Platform Development: ",
        content:
          "Efficient solutions delivering consistent experiences across platforms like Android and iOS.",
      },
      {
        heading: "UI/UX Design ",
        content:
          "Engaging, intuitive designs that elevate user satisfaction and retention.",
      },
      {
        heading: "App Testing and Optimization",
        content:
          "Rigorous testing and fine-tuning for error-free, high-performance applications.",
      },
    ],
  },
  {
    id: "web-development",
    title: "Website Development",
    description:
      "Design responsive, visually appealing, and functional websites that deliver an exceptional user experience.",
    detailedDescription:
      "In the ever-evolving digital era, powerful web applications are the backbone of modern businesses and Novanectar Services Private Limited is your trusted partner in crafting them. We bring innovative ideas, expertise, and precision to create dynamic, user-centric web applications that redefine efficiency and engagement. From seamless functionality to scalable designs, our solutions empower your business to thrive in the digital landscape. Turning your ideas into impactful web applications that drive success is our sole objective.",
    icon: webDevIcon,
    image: webDev,
    coverImage: webDevCover,
    capability: [
      {
        heading: "Custom Development",
        content:
          "Bespoke web applications designed to meet your unique needs, combining creativity, functionality, and reliability.",
      },
      {
        heading: "Responsive Design",
        content:
          "Applications optimized for flawless performance across all devices, ensuring a consistent and intuitive user experience.",
      },
      {
        heading: "Dynamic Web Applications",
        content:
          "Advanced, interactive solutions equipped with cutting-edge technologies to enhance user engagement and streamline operations.",
      },
      {
        heading: "Testing and Quality Assurance",
        content:
          "Rigorous testing protocols that deliver robust, secure, and error-free web applications aligned with industry standards.",
      },
      {
        heading: "Scalability and Future Proofing",
        content:
          " Scalable applications are built to evolve with your business while integrating the latest technologies for long-term sustainability.",
      },
      {
        heading: "Web Support and Maintenance",
        content:
          "End-to-end maintenance and support to ensure optimal performance, security, and reliability throughout the application lifecycle.",
      },
    ],
  },
  {
    id: "ecommerce",
    title: "Ecommerce",
    description:
      "Develop robust e-commerce platforms to boost your online presence and streamline your business operations.",
    detailedDescription:
      "Novanectar Services Private Limited creates dynamic e-commerce solutions designed to boost your sales and enhance customer experiences. Our team blends innovative technology with intuitive design to build secure, scalable online stores. Whether you're starting a new venture or scaling up, we provide tailored solutions that ensure smooth transactions, easy navigation, and seamless integration across platforms. Our vision is to help you turn your e-commerce vision into a thriving business.",
    icon: eCommLogo,
    image: eComm,
    coverImage: eCommCover,
    capability: [
      {
        heading: "Store Management Features",
        content:
          "Easy-to-use tools for managing product catalogues, inventory, and orders to optimize your store’s performance.",
      },
      {
        heading: "Secure Payment Integration",
        content:
          "Safe and reliable payment gateways for seamless and secure transactions.",
      },
      {
        heading: "Shopping Cart and Checkout",
        content:
          "User-friendly cart and checkout processes to boost conversions and improve user experience.",
      },
      {
        heading: "Multi-Channel Integration",
        content:
          "Connect with various platforms like Amazon and social media for wider reach and better sales.",
      },
      {
        heading: "Customer Support Tools",
        content:
          "Integrated tools for efficient customer service, handling inquiries, and managing support tickets.",
      },
      {
        heading: "Maintenance and Support",
        content:
          "Continuous maintenance, updates, and round-the-clock support to ensure smooth, uninterrupted operations.",
      },
    ],
  },
  {
    id: "seo",
    title: "SEO",
    description:
      "Optimize your online content to improve visibility, attract organic traffic, and enhance your search engine rankings.",
    detailedDescription:
      "Novanectar Services Private Limited specializes in transforming your online presence with powerful SEO strategies tailored to your business goals. From keyword optimization to technical enhancements, we ensure your website ranks higher, attracts the right audience, and drives sustainable growth. Our dedicated team leverages proven techniques and innovative tools to deliver measurable results. With us, your website won’t just compete—it will lead the search engine game.",
    icon: seoLogo,
    image: seo,
    coverImage: seoCover,
    capability: [
      {
        heading: "SEO Audit",
        content:
          "A detailed analysis of your website to identify weaknesses, uncover opportunities, and develop a roadmap for improved search engine performance.",
      },
      {
        heading: "On-Page SEO",
        content:
          "Enhancing website content, meta tags, and internal links to improve search rankings and provide a seamless user experience.",
      },
      {
        heading: "Off-page SEO",
        content:
          "Building high-quality backlinks, managing brand mentions, and fostering authority to boost your site’s credibility and visibility.",
      },
      {
        heading: "Keyword Research and Analysis",
        content:
          "Discovering the most effective keywords to target your audience, driving relevant traffic and improving conversion rates.",
      },
      {
        heading: "Technical SEO",
        content:
          "Addressing technical aspects like site speed, mobile-friendliness, and structured data to ensure optimal search engine indexing and performance.",
      },
      {
        heading: "Reporting and Analysis",
        content:
          "Providing in-depth performance reports with actionable insights to track progress, measure ROI, and refine strategies for sustained growth.",
      },
    ],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Provide strategic and effective marketing campaigns to promote your brand and drive measurable growth.",
    detailedDescription:
      "In the fast-paced digital age, standing out online is more than just a challenge. It is an art, and Novanectar Services Private Limited, masters this art with innovative digital marketing solutions tailored to your unique goals. From crafting engaging content to running data-driven campaigns, we help your brand connect with the right audience, foster meaningful relationships, and drive measurable growth. Our aim is to transform your digital presence into a powerful success story.",
    icon: digitalMarkLogo,
    image: digitalMarketing,
    coverImage: digitalMarketingCover,
    capability: [
      {
        heading: "Social Media Marketing",
        content:
          "Strategically planned campaigns designed to build a strong online presence, engage audiences, and foster brand loyalty across platforms like Facebook, Instagram, and LinkedIn.",
      },
      {
        heading: "Content Marketing",
        content:
          "Creating high-quality, value-driven content, including blogs, articles, and videos, that captivates audiences, establishes authority, and drives meaningful interactions with your brand.",
      },
      {
        heading: "Email Marketing",
        content:
          "Designing and executing personalized email campaigns to nurture leads, promote products, and keep your customers engaged and informed.",
      },
      {
        heading: "Analytics and Reporting",
        content:
          "Leveraging advanced analytics tools to track performance, identify trends, and deliver actionable insights that refine strategies for optimal results.",
      },
      {
        heading: "Online Reputation Management",
        content:
          "Proactively managing and enhancing your brand’s image, ensuring positive engagement and mitigating any negative impacts on your digital footprint.",
      },
      {
        heading: "Pay-Per-Click Advertising",
        content:
          "Creating and managing targeted ad campaigns to maximize reach, drive traffic, and deliver measurable ROI with cost-effective strategies.",
      },
    ],
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}
