### NOTE:
- Currently under construction. Some features may not work due to Reddit API changes. 

### Features

- Download saved posts/comments as a JSON file.
- Download subreddits as a txt file.
- Perform bulk saving of posts/comments.
- Perform bulk subscription to subreddits.

# <a href="https://www.reddit-archiver.xyz/">reddit-archiver</a>

Live: https://www.reddit-archiver.xyz

Reddit Archiver is an application that allows you to archive sections of your Reddit account. It provides features to download your saved posts/comments as a JSON file, download your subreddits as a txt file, and perform bulk operations like saving posts/comments and subscribing to subreddits.

## Motivation
The motivation behind this app is to enable users to migrate account data, such as subreddits and saved posts/comments, to another Reddit account eas

## Authorization

To authorize Reddit Archiver, click on the sign-in button and then click "Allow" in the newly opened Reddit window. This grants the app an access token to access certain resources on your behalf. Don't worry, this token expires in 1 day, and you can revoke the app&apos; access to your Reddit account by simply logging out of the app.

### Bulk Saving Posts/Comments
The app will require you to submit a json in the following format: 
  ```json
[
	{
		"kind": "t3", // could be t3 or t1 object type
		"data": {
			"name": "t3_123sda23" // sample fullname of a thing
		}
	}
]
```

For more information about `object types` and what a `thing` is, refer to <a href="https://www.reddit.com/dev/api/oauth/#fullnames">Reddit API Documentation</a>.

If you intend to migrate all saved posts/comments from one account to another, follow these steps:

1. Log in to the source account and download the JSON file containing your saved posts.
2. Log out of the source account.
3. Log in to the destination account and upload the JSON file downloaded from the source account.

### Privacy

Reddit Archiver does not store any of your account details. The app only requests essential authorization scopes to function properly:
	
	scope: "identity edit save read mysubreddits subscribe save"
	
You can read more about what these scopes mean <a href="https://www.reddit.com/dev/api/oauth/">here</a>.

### Upcoming Features
- Easy switching between accounts.
- Downloading all user account details in one place.
- One-click migration of account data to another account, eliminating the need for manual downloading/uploading.
- Displaying saved posts/comments categorized by subreddit or type (post or comment).
