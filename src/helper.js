export class TDate extends Date {

  /**
   * @param {String} formatedDate 1999-2-7
   */
  static fromFormated(formatedDate) {
    return new TDate(formatedDate);
  }

  /**
   * @param {Date} date Javascript date time.
   */

  static today() {
    return new TDate().format();
  }

  format() {
    return `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()}`;
  }
}
