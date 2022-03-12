function attachEvents() {

    $('#btnLoadPosts').on('click', loadPosts);
    $('#btnViewPost').on('click', loadPost);
    const mainURL = 'https://baas.kinvey.com/appdata/kid_SJNmiOkwb/';
    const credentials = 'pesho:p';
    let postsOption = $('#posts');
    let comments = $('#post-comments');


    loadPosts();

    async function loadPost() {
        let selectedPost = $('option:selected');
        let postData = await getPostData(selectedPost.val());

        $('#post-title').text(`${postData.title}`);
        $('#post-body').text(`${postData.body}`);
        
        let commentsData = await getCommentsData(selectedPost.val());
        comments.empty();
        for (let comment in commentsData) {
            comments.append($('<li>').text(commentsData[comment]['text']));
        }
        // 10001
    }

    async function getCommentsData(postId) {
        return await $.ajax({
            url: `${mainURL}comments/?query={"post_id":"${postId}"}`,
            method: 'GET',
            headers: {
                'Authorization': `Basic ${btoa(credentials)}`
            }
        });
    }
    async function getPostData(postId) {
        return await $.ajax({
            url: `${mainURL}posts/${postId}`,
            method: 'GET',
            headers: {
                'Authorization': `Basic ${btoa(credentials)}`
            }
        });
    }

    async function loadPosts(data) {
        let posts = await getPosts();

        for (let postId in posts) {
            postsOption.append($('<option>').text(posts[postId].title).val(posts[postId]['_id']));
        }

    }

    async function getPosts() {
        return await $.ajax({
            url: `${mainURL}posts`,
            method: 'GET',
            headers: {
                'Authorization': `Basic ${btoa(credentials)}`
            }
        });
    }

}
