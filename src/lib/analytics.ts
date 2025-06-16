import ReactGA from "react-ga4";

export const initGA = () => {
  const measurementId = process.env.NEXT_PUBLIC_ANALYTICS_MEASUREMENT_ID;

  if (!measurementId) {
    console.warn("GA Measurement ID not found.");
    return;
  }

  ReactGA.initialize(measurementId);
};

export const logPageView = (url: string) => {
  ReactGA.send({ hitType: "pageview", page: url });
};
