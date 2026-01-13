import { test, TestInfo } from '@playwright/test';

/**
 * Allure Utilities - Enhanced Allure reporting helpers
 */
export class AllureUtils {
  /**
   * Add a step to the Allure report
   */
  static async addStep<T>(
    name: string,
    stepFn: () => Promise<T>
  ): Promise<T> {
    return test.step(name, stepFn) as Promise<T>;
  }

  /**
   * Add a description to the test
   */
  static addDescription(description: string): void {
    test.describe.describe('description', () => {
      // This will appear in the Allure report
    });
  }

  /**
   * Add test ID (allureTestId)
   */
  static setTestId(testId: string): void {
    test.info().annotations.push({ type: 'testId', description: testId });
  }

  /**
   * Add link to the test
   */
  static addLink(url: string, name?: string, linkType: 'issue' | 'tms' | 'link' = 'link'): void {
    test.info().annotations.push({ type: linkType, description: name || url });
  }

  /**
   * Add issue link
   */
  static addIssue(issueUrl: string, issueId: string): void {
    test.info().annotations.push({ type: 'issue', description: issueUrl });
  }

  /**
   * Add TMS (Test Management System) link
   */
  static addTMS(tmsUrl: string, tmsId: string): void {
    test.info().annotations.push({ type: 'tms', description: tmsUrl });
  }

  /**
   * Add owner to the test
   */
  static addOwner(owner: string): void {
    test.info().annotations.push({ type: 'owner', description: owner });
  }

  /**
   * Add severity to the test
   */
  static addSeverity(severity: 'critical' | 'blocker' | 'normal' | 'minor' | 'trivial'): void {
    test.info().annotations.push({ type: 'severity', description: severity });
  }

  /**
   * Add tag to the test
   */
  static addTag(tag: string): void {
    test.info().annotations.push({ type: 'tag', description: tag });
  }

  /**
   * Add epic to the test
   */
  static addEpic(epic: string): void {
    test.info().annotations.push({ type: 'epic', description: epic });
  }

  /**
   * Add feature to the test
   */
  static addFeature(feature: string): void {
    test.info().annotations.push({ type: 'feature', description: feature });
  }

  /**
   * Add story to the test
   */
  static addStory(story: string): void {
    test.info().annotations.push({ type: 'story', description: story });
  }

  /**
   * Add suite to the test
   */
  static addSuite(suite: string): void {
    test.info().annotations.push({ type: 'suite', description: suite });
  }

  /**
   * Add parent suite to the test
   */
  static addParentSuite(parentSuite: string): void {
    test.info().annotations.push({ type: 'parentSuite', description: parentSuite });
  }

  /**
   * Log a message to the test
   */
  static logMessage(message: string): void {
    console.log(`[Allure Log] ${message}`);
  }

  /**
   * Attach a file to the test
   */
  static async attachFile(
    name: string,
    content: Buffer | string,
    contentType = 'text/plain'
  ): Promise<void> {
    await test.info().attach(name, {
      body: content,
      contentType,
    });
  }

  /**
   * Attach a screenshot to the test
   */
  static async attachScreenshot(
    name: string,
    content: Buffer | string
  ): Promise<void> {
    await test.info().attach(name, {
      body: content,
      contentType: 'image/png',
    });
  }

  /**
   * Attach a JSON object to the test
   */
  static async attachJSON(
    name: string,
    data: Record<string, unknown>
  ): Promise<void> {
    await test.info().attach(name, {
      body: JSON.stringify(data, null, 2),
      contentType: 'application/json',
    });
  }

  /**
   * Attach a CSV to the test
   */
  static async attachCSV(
    name: string,
    data: Record<string, unknown>[]
  ): Promise<void> {
    const headers = Object.keys(data[0] || {});
    const rows = data.map((row) =>
      headers.map((h) => String(row[h] ?? '')).join(',')
    );
    const csv = [headers.join(','), ...rows].join('\n');

    await test.info().attach(name, {
      body: csv,
      contentType: 'text/csv',
    });
  }

  /**
   * Start a test group
   */
  static startGroup(name: string): void {
    console.log(`[Allure Group] Starting: ${name}`);
  }

  /**
   * End a test group
   */
  static endGroup(name: string): void {
    console.log(`[Allure Group] Ending: ${name}`);
  }

  /**
   * Get current test info
   */
  static getTestInfo(): TestInfo {
    return test.info();
  }

  /**
   * Get test status
   */
  static getTestStatus(): string {
    return test.info().status;
  }

  /**
   * Check if test failed
   */
  static isTestFailed(): boolean {
    return test.info().status === 'failed';
  }

  /**
   * Check if test passed
   */
  static isTestPassed(): boolean {
    return test.info().status === 'passed';
  }

  /**
   * Check if test was skipped
   */
  static isTestSkipped(): boolean {
    return test.info().status === 'skipped';
  }

  /**
   * Get test retry number
   */
  static getRetryNumber(): number {
    return test.info().retry;
  }

  /**
   * Get test duration in milliseconds
   */
  static getTestDuration(): number {
    return test.info().duration;
  }

  /**
   * Get test worker ID
   */
  static getWorkerId(): string {
    return test.info().workerIndex.toString();
  }

  /**
   * Get parallel worker count
   */
  static getWorkerCount(): number {
    return test.info().config.workers;
  }
}
