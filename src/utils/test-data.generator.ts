import { faker } from '@faker-js/faker';

/**
 * Test Data Generator - Utilities for generating test data
 */
export class TestDataGenerator {
  /**
   * Generate random email address
   */
  static generateEmail(): string {
    return faker.internet.email();
  }

  /**
   * Generate random PID/Passport number (8-20 characters)
   */
  static generatePid(): string {
    return faker.string.alphanumeric(10).toUpperCase();
  }

  /**
   * Generate random password
   */
  static generatePassword(length = 12): string {
    return faker.internet.password(length);
  }

  /**
   * Generate random first name
   */
  static generateFirstName(): string {
    return faker.person.firstName();
  }

  /**
   * Generate random last name
   */
  static generateLastName(): string {
    return faker.person.lastName();
  }

  /**
   * Generate random full name
   */
  static generateFullName(): string {
    return faker.person.fullName();
  }

  /**
   * Generate random phone number
   */
  static generatePhoneNumber(): string {
    return faker.phone.number();
  }

  /**
   * Generate random company name
   */
  static generateCompanyName(): string {
    return faker.company.name();
  }

  /**
   * Generate random address
   */
  static generateAddress(): string {
    return faker.location.streetAddress();
  }

  /**
   * Generate random city
   */
  static generateCity(): string {
    return faker.location.city();
  }

  /**
   * Generate random state
   */
  static generateState(): string {
    return faker.location.state();
  }

  /**
   * Generate random zip code
   */
  static generateZipCode(): string {
    return faker.location.zipCode();
  }

  /**
   * Generate random country
   */
  static generateCountry(): string {
    return faker.location.country();
  }

  /**
   * Generate random job title
   */
  static generateJobTitle(): string {
    return faker.person.jobTitle();
  }

  /**
   * Generate user object with all fields
   */
  static generateUser() {
    return {
      email: this.generateEmail(),
      password: this.generatePassword(),
      firstName: this.generateFirstName(),
      lastName: this.generateLastName(),
      fullName: this.generateFullName(),
      phoneNumber: this.generatePhoneNumber(),
      address: this.generateAddress(),
      city: this.generateCity(),
      state: this.generateState(),
      zipCode: this.generateZipCode(),
      country: this.generateCountry(),
      company: this.generateCompanyName(),
      jobTitle: this.generateJobTitle(),
    };
  }

  /**
   * Generate credit card number (valid format only)
   */
  static generateCreditCardNumber(): string {
    return faker.finance.creditCardNumber();
  }

  /**
   * Generate credit card CVV
   */
  static generateCreditCardCVV(): string {
    return faker.finance.creditCardCVV();
  }

  /**
   * Generate credit card expiration date
   */
  static generateCreditCardExpiry(): string {
    return faker.finance.creditCardExpiry();
  }

  /**
   * Generate random UUID
   */
  static generateUUID(): string {
    return faker.string.uuid();
  }

  /**
   * Generate random alphanumeric string
   */
  static generateAlphanumeric(length = 10): string {
    return faker.string.alphanumeric(length);
  }

  /**
   * Generate random numeric string
   */
  static generateNumeric(length = 10): string {
    return faker.string.numeric(length);
  }

  /**
   * Generate random alpha string
   */
  static generateAlpha(length = 10): string {
    return faker.string.alpha(length);
  }

  /**
   * Generate random paragraph
   */
  static generateParagraph(sentenceCount = 3): string {
    return faker.lorem.paragraph(sentenceCount);
  }

  /**
   * Generate random sentence
   */
  static generateSentence(wordCount = 10): string {
    return faker.lorem.sentence(wordCount);
  }

  /**
   * Generate random words
   */
  static generateWords(count = 5): string {
    return faker.lorem.words(count);
  }

  /**
   * Generate random date in the past
   */
  static generatePastDate(): Date {
    return faker.date.past();
  }

  /**
   * Generate random date in the future
   */
  static generateFutureDate(): Date {
    return faker.date.future();
  }

  /**
   * Generate random URL
   */
  static generateUrl(): string {
    return faker.internet.url();
  }

  /**
   * Generate random image URL
   */
  static generateImageUrl(width = 640, height = 480): string {
    return `https://picsum.photos/${width}/${height}`;
  }

  /**
   * Generate random color
   */
  static generateColor(): string {
    return faker.internet.color();
  }

  /**
   * Generate MAC address
   */
  static generateMacAddress(): string {
    return faker.network.mac();
  }

  /**
   * Generate IPv4 address
   */
  static generateIPv4Address(): string {
    return faker.internet.ipv4();
  }

  /**
   * Generate IPv6 address
   */
  static generateIPv6Address(): string {
    return faker.internet.ipv6();
  }
}
