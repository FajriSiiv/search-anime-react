// ApiQueue.ts

class ApiQueue<T> {
  private queue: (() => Promise<T>)[] = [];
  private isProcessing = false;

  // Method to add a request to the queue
  enqueue(request: () => Promise<T>) {
    this.queue.push(request);
    this.processQueue();
  }

  // Method to process the queue
  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;

    while (this.queue.length > 0) {
      const request = this.queue.shift(); // Get the next request
      if (request) {
        await request(); // Execute the request
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before the next request
      }
    }

    this.isProcessing = false;
  }
}

export default ApiQueue;
