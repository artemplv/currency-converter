const noop = () => {};

class SelectedCountries {
  constructor(max = 5, onChange = noop) {
    this.countries = {};
    this.length = 0;
    this.max = max;
    this.onChange = onChange;
  }

  get list() {
    return Object.values(this.countries);
  }

  get countryCodes() {
    return Object.keys(this.countries);
  }

  isSelected(countryCode) {
    return !!this.countries[countryCode];
  }

  add(country) {
    const { countryCode } = country;

    if (this.countries[countryCode] || this.isFull()) {
      return this.length;
    }

    this.countries[countryCode] = country;
    this.length += 1;

    this.onChange(this.list);

    return this.length;
  }

  remove(countryCode) {
    if (!this.countries[countryCode]) {
      return this.length;
    }

    delete this.countries[countryCode];
    this.length -= 1;

    this.onChange(this.list);

    return this.length;
  }

  isFull() {
    return this.length >= this.max;
  }
}

export default SelectedCountries;
