/**
 * GitHub API Service
 * Handles committing changes to GitHub repository
 */

export interface GitHubCommitPayload {
  message: string;
  content: string;
  sha?: string;
  branch?: string;
}

export const githubAPIService = {
  /**
   * Get the GitHub token from local storage
   */
  getToken(): string | null {
    return localStorage.getItem('github_token');
  },

  /**
   * Set the GitHub token
   */
  setToken(token: string): void {
    localStorage.setItem('github_token', token);
  },

  /**
   * Check if GitHub token is available
   */
  hasToken(): boolean {
    return !!this.getToken();
  },

  /**
   * Get file content from GitHub
   */
  async getFileContent(
    owner: string,
    repo: string,
    path: string,
    branch: string = 'main'
  ): Promise<{ content: string; sha: string }> {
    const token = this.getToken();
    if (!token) {
      throw new Error('GitHub token not configured');
    }

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3.raw',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch file from GitHub: ${response.statusText}`);
    }

    const content = await response.text();
    
    // Get SHA for update
    const dataResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    const data = await dataResponse.json();

    return { content, sha: data.sha };
  },

  /**
   * Commit file to GitHub
   */
  async commitFile(
    owner: string,
    repo: string,
    path: string,
    content: string,
    message: string,
    sha?: string,
    branch: string = 'main'
  ): Promise<void> {
    const token = this.getToken();
    if (!token) {
      throw new Error('GitHub token not configured');
    }

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
        content: btoa(content),
          sha,
          branch,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to commit to GitHub: ${error.message}`);
    }
  },

  /**
   * Create a pull request
   */
  async createPullRequest(
    owner: string,
    repo: string,
    title: string,
    body: string,
    head: string,
    base: string = 'main'
  ): Promise<number> {
    const token = this.getToken();
    if (!token) {
      throw new Error('GitHub token not configured');
    }

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          body,
          head,
          base,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to create pull request: ${error.message}`);
    }

    const data = await response.json();
    return data.number;
  },
};
