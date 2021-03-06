import log from '../../../../log';
import { SubmissionError } from '../SubmissionService.types';

enum SubmissionErrorCode {
  ARCHIVE_DOWNLOAD_NOT_FOUND_ERROR = 'SUBMISSION_SERVICE_COMMON_ARCHIVE_DOWNLOAD_NOT_FOUND_ERROR',
  ARCHIVE_DOWNLOAD_FORBIDDEN_ERROR = 'SUBMISSION_SERVICE_COMMON_ARCHIVE_DOWNLOAD_FORBIDDEN_ERROR',
  ANDROID_UNKNOWN_ERROR = 'SUBMISSION_SERVICE_ANDROID_UNKNOWN_ERROR',
  ANDROID_FIRST_UPLOAD_ERROR = 'SUBMISSION_SERVICE_ANDROID_FIRST_UPLOAD_ERROR',
  ANDROID_OLD_VERSION_CODE_ERROR = 'SUBMISSION_SERVICE_ANDROID_OLD_VERSION_CODE_ERROR',
  ANDROID_MISSING_PRIVACY_POLICY = 'SUBMISSION_SERVICE_ANDROID_MISSING_PRIVACY_POLICY',
}

const SubmissionErrorMessages: Record<SubmissionErrorCode, string> = {
  [SubmissionErrorCode.ARCHIVE_DOWNLOAD_NOT_FOUND_ERROR]:
    "Failed to download the archive file (Response code: 404 Not Found). Please make sure the URL you've provided is correct.",
  [SubmissionErrorCode.ARCHIVE_DOWNLOAD_FORBIDDEN_ERROR]:
    'Failed to download the archive file (Response code: 403 Forbidden). This is most probably caused by trying to upload an expired build artifact. All Expo build artifacts expire after 30 days.',
  [SubmissionErrorCode.ANDROID_UNKNOWN_ERROR]:
    "We couldn't figure out what went wrong. Please see logs to learn more.",
  [SubmissionErrorCode.ANDROID_FIRST_UPLOAD_ERROR]:
    "You haven't submitted this app to Google Play Store yet. The first submission of the app needs to be performed manually.\n" +
    `${log.terminalLink('Learn more here', 'https://expo.fyi/first-android-submission')}.`,
  [SubmissionErrorCode.ANDROID_OLD_VERSION_CODE_ERROR]:
    "You've already submitted this version of the app.\n" +
    'Versions are identified by Android version code (expo.android.versionCode in app.json).\n' +
    "If you're submitting a managed Expo project, increment the version code in app.json and build the project with expo build:android.\n" +
    `${log.terminalLink('Learn more here', 'https://expo.fyi/bumping-android-version-code')}.`,
  [SubmissionErrorCode.ANDROID_MISSING_PRIVACY_POLICY]:
    'The app has permissions that require a privacy policy set for the app.\n' +
    `${log.terminalLink('Learn more here', 'https://expo.fyi/missing-privacy-policy')}.`,
};

function printSubmissionError(error: SubmissionError): boolean {
  if ((Object.values(SubmissionErrorCode) as string[]).includes(error.errorCode)) {
    const errorCode = error.errorCode as SubmissionErrorCode;
    log.addNewLineIfNone();
    log.error(SubmissionErrorMessages[errorCode]);
    return errorCode === SubmissionErrorCode.ANDROID_UNKNOWN_ERROR;
  } else {
    log(error.message);
    return true;
  }
}

export { printSubmissionError };
