import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            // appwriteService.getPost() returns a promise.
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} /> 
            {/* PostFrom is a component that wants post as object ... Props passing. */}
        </Container>
    </div>
  ) : null
}

export default EditPost

/**
 * The useParams hook is a React Router hook used to access dynamic parameters from the current URL in a React functional component.
 It returns an object containing key-value pairs of the dynamic segments defined in the route path, such as :id or :productId,
  which are extracted from the URL when the route is accessed.
 For example, if the route is defined as /products/:id and the current URL is /products/123, useParams() will return { id: '123' }.
 */

 /**
  * What this component actually does (no bullshit) : jo post fetch karni h uska slug uhtao backend se post fetch karo and post data PostForm ko bejdo and <PostFrom> component is rendered then.

EditPost does ONLY THREE THINGS:

    Reads which post to edit (slug)

    Fetches that post from backend

    Sends the post data to <PostForm />

That’s it.

There is ZERO update logic here.
  */