<?php

namespace App\Controller\Api;

use App\Service\User\Auth;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class LoginController extends AbstractController
{
    /**
     * @Route("/api/login", name="api_login")
     */
    public function index(Request $request, Auth $auth): Response
    {
        $login = $request->query->get('login');
        $password = $request->query->get('password');

        $is_authenticated = (isset($login) and isset($password)) ? $auth->authenticate($login, $password) : false;

        return new JsonResponse([
            'success' => $is_authenticated,
            'message' => null,
            'payload' => [

            ]
        ]);
    }
}
