import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({

  name: 'WeatherApp',

  setup: function() {

    let getDate = (timeString) => new Date(`1970-01-01T${timeString}`)

    return {
      getWeatherData,
      WeatherConditionIcons,
      getDate
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="(item, index) in getWeatherData()"
          class="weather-card"
          :class="{ 'weather-card--night': getDate(item.current.dt) < getDate(item.current.sunrise) || getDate(item.current.dt) > getDate(item.current.sunset) }">
          <div v-if="item.alert"
            class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{item.alert.sender_name}}: {{item.alert.description}}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ item.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ item.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon"
                 :title="item.current.weather.description">{{WeatherConditionIcons[item.current.weather.id]}}️</div>
            <div class="weather-conditions__temp">{{(item.current.temp - 273.15).toFixed(1)}} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{(item.current.pressure * 0.75).toFixed(0)}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{item.current.humidity}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{item.current.clouds}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{item.current.wind_speed}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})