// interfaz para el objeto de respuesta del clima
export interface WeatherResponse {
  name: string;
  main: {
    temp_max: number;
    temp_min: number;
    humidity: number;
    pressure: number;
  };
  weather?: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

// Interfaz para el objeto de respuesta del pronóstico del tiempo
export interface ForecastResponse {
  city: {
    name: string;
  };
  list: {
    main: {
      temp_max: number;
      temp_min: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
  }[];
}
