import ProgressBar from 'progress';

import { createApplicationInstance, sortByLuminosity } from './util';

import { App, AppData, AppProcess } from './types';

const colorange = async (
  apps: App[],
  currentProcesses: AppProcess[],
  processId: string,
): Promise<AppData[]> => {
  const newProcess = {
    id: processId,
    processing: true,
    sortedData: null,
  };

  currentProcesses.push(newProcess);

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promiseArr: any[] = [];

    const bar = new ProgressBar(
      'Getting Application Information [:bar] :percent (:current / :total) :etas',
      { total: apps.length, width: 20 },
    );

    apps.forEach((app: App) =>
      promiseArr.push(createApplicationInstance(app, bar, data)),
    );

    await Promise.all(promiseArr);

    const sortedAppData = sortByLuminosity(data);

    const currentProcess = currentProcesses.find(
      (proc: AppProcess) => proc.id === processId,
    );

    currentProcess.sortedData = sortedAppData;
    currentProcess.processing = false;

    return sortedAppData;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export default colorange;
