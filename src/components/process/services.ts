// SVG content as strings to avoid TypeScript parsing issues
const SVG_ICONS:any = {
  strategy: `<svg width="46" height="52" viewBox="0 0 46 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 0.333008L45.1666 13.1663V38.833L23 51.6663L0.833313 38.833V13.1663L23 0.333008ZM7.81903 14.5143L23.0002 23.3033L38.1811 14.5144L23 5.72534L7.81903 14.5143ZM5.49998 18.564V36.1424L20.6669 44.9232V27.3448L5.49998 18.564ZM25.3335 44.923L40.5 36.1424V18.5642L25.3335 27.3448V44.923Z" fill="#3771DC"/>
  </svg>`,

  wireframing: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33.1924 2.07232L45.8856 14.7655C46.2762 15.1561 46.2762 15.7892 45.8856 16.1797C45.7358 16.3296 45.5424 16.4279 45.333 16.4606L42.3848 16.9216L31.0712 5.60786L31.4954 2.638C31.5736 2.09128 32.08 1.71137 32.6268 1.78947C32.841 1.82007 33.0394 1.91932 33.1924 2.07232ZM9.18974 40.2949C16.6345 33.6319 25.1798 31.6393 34.4758 29.2539L35.3686 21.2191L26.7738 12.6241L18.7387 13.5169C16.3535 22.8129 14.3608 31.3583 7.69772 38.8029L4.9082 36.0135C10.5651 29.4137 12.6864 22.1071 15.5148 9.8505L28.2428 8.43628L39.5566 19.7501L38.1422 32.4779C25.8858 35.3063 18.5789 37.4277 11.9793 43.0845L9.18974 40.2949ZM19.7574 28.2353C18.1953 26.6731 18.1953 24.1405 19.7574 22.5785C21.3196 21.0163 23.8522 21.0163 25.4142 22.5785C26.9764 24.1405 26.9764 26.6731 25.4142 28.2353C23.8522 29.7973 21.3196 29.7973 19.7574 28.2353Z" fill="#3771DC"/>
  </svg>`,

  development: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6H42C43.1046 6 44 6.89544 44 8V40C44 41.1046 43.1046 42 42 42H6C4.89544 42 4 41.1046 4 40V8C4 6.89544 4.89544 6 6 6ZM8 10V38H40V10H8ZM24 30H36V34H24V30ZM17.3337 24L11.6768 18.3431L14.5053 15.5147L22.9906 24L14.5053 32.4852L11.6768 29.6568L17.3337 24Z" fill="#3771DC"/>
  </svg>`,

  qualityAssurance: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40.1666 30.3996L42.5708 31.8422C43.0442 32.1264 43.1978 32.7406 42.9138 33.2142C42.8292 33.355 42.7114 33.4728 42.5708 33.5572L25.0288 44.0822C24.3954 44.4624 23.6042 44.4624 22.9708 44.0822L5.42902 33.5572C4.95544 33.273 4.80186 32.6588 5.08602 32.1852C5.17046 32.0443 5.28826 31.9266 5.42902 31.8422L7.8332 30.3996L23.9998 40.0996L40.1666 30.3996ZM40.1666 20.9996L42.5708 22.4422C43.0442 22.7264 43.1978 23.3406 42.9138 23.8142C42.8292 23.955 42.7114 24.0728 42.5708 24.1572L23.9998 35.2996L5.42902 24.1572C4.95544 23.873 4.80186 23.2588 5.08602 22.7852C5.17046 22.6444 5.28826 22.5266 5.42902 22.4422L7.8332 20.9996L23.9998 30.6996L40.1666 20.9996ZM25.0288 2.61703L42.5708 13.1422C43.0442 13.4263 43.1978 14.0406 42.9138 14.5141C42.8292 14.6549 42.7114 14.7727 42.5708 14.8571L23.9998 25.9996L5.42902 14.8571C4.95544 14.573 4.80186 13.9587 5.08602 13.4852C5.17046 13.3444 5.28826 13.2266 5.42902 13.1422L22.9708 2.61703C23.6042 2.23703 24.3954 2.23703 25.0288 2.61703ZM23.9998 6.66441L11.7745 13.9997L23.9998 21.335L36.2252 13.9997L23.9998 6.66441Z" fill="#3771DC"/>
  </svg>`,

  operation: `<svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 23.3333H4.66667V44.3333H0V23.3333ZM7 28H11.6667V44.3333H7V28ZM32.6667 14H37.3333V44.3333H32.6667V14ZM39.6667 18.6667H44.3333V44.3333H39.6667V18.6667ZM16.3333 0H21V44.3333H16.3333V0ZM23.3333 4.66667H28V44.3333H23.3333V4.66667Z" fill="#3771DC"/>
  </svg>`,

  launch: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_108_4729)">
      <path d="M10.5301 11.1434V35.1434H37.9587V11.1434H10.5301ZM8.81585 7.71484H39.673C40.6198 7.71484 41.3873 8.48235 41.3873 9.42913V36.8577C41.3873 37.8045 40.6198 38.572 39.673 38.572H8.81585C7.86908 38.572 7.10156 37.8045 7.10156 36.8577V9.42913C7.10156 8.48235 7.86908 7.71484 8.81585 7.71484ZM29.0323 19.3598L25.9587 16.2863H34.5302V24.8577L31.4566 21.7841L24.8326 28.4081L21.1961 24.7716L16.3474 29.6203L13.923 27.196L21.1961 19.9228L24.8326 23.5593L29.0323 19.3598Z" fill="#3771DC"/>
    </g>
    <defs>
      <clipPath id="clip0_108_4729">
        <rect width="48" height="48" fill="white"/>
      </clipPath>
    </defs>
  </svg>`,
}

// Service data with icon keys
export const services = [
  {
    title: "Strategy",
    description:
      "We craft tailored digital strategies, aligning business goals with innovative solutions for impactful results.",
    iconKey: "strategy",
  },
  {
    title: "Wireframing & Design",
    description:
      "We create intuitive wireframes and stunning designs to ensure seamless user experiences and visual appeal.",
    iconKey: "wireframing",
  },
  {
    title: "Development",
    description:
      "Employing advanced technologies, we build scalable, robust solutions optimized for performance and functionality.",
    iconKey: "development",
  },
  {
    title: "Quality Assurance",
    description:
      "Thorough testing ensures flawless performance, addressing bugs and aligning deliverables with client expectations.",
    iconKey: "qualityAssurance",
  },
  {
    title: "Operation",
    description:
      "We ensure smooth deployment and post-launch support for consistent performance and enhanced customer satisfaction.",
    iconKey: "operation",
  },
  {
    title: "Launch",
    description:
      "Providing ongoing support and updates to ensure your project remains secure, efficient, and up-to-date with the latest technologies.",
    iconKey: "launch",
  },
]

// Export SVG icons for use in components
export { SVG_ICONS }