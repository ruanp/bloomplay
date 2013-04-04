var bloomCalculator = {
  len: undefined,
  elements: undefined,
  error: undefined,
  filters: undefined,
  optimize: function(elements, errorD) {
    if (arguments) {
      this.error = 1/errorD;
      this.elements = elements;
    }
    this.len = - (this.elements * Math.log(this.error)) / (Math.pow(Math.LN2,2));
    this.filters = (this.len / this.elements)*Math.LN2;
    return [this.len.toLocaleString(), this.filters];
    }
};