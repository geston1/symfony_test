<?php

namespace App\Service\User;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\ORMException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class Auth
{
    /**
     * @var EntityManagerInterface
     */
    public $entity_manager;

    /**
     * @var UserRepository
     */
    public $repository;

    /**
     * @var UserPasswordHasherInterface
     */
    public $hasher;

    public function __construct(
        EntityManagerInterface $entity_manager,
        UserRepository $repository,
        UserPasswordHasherInterface $hasher
    )
    {
        $this->entity_manager = $entity_manager;
        $this->repository = $repository;
        $this->hasher = $hasher;
    }

    public function authenticate(string $login, string $password): bool
    {
        $user = $this->repository->findOneBy([ 'login' => $login ]);
        if (!$user)
            return false;
        return $this->hasher->isPasswordValid($user, $password);
    }

    public function register(string $login, string $password): bool
    {
        $user = new User();
        $user->setLogin($login);
        $user->setPassword($this->hasher->hashPassword($user, $password));

        try {
            $this->entity_manager->persist($user);
            $this->entity_manager->flush();
        } catch (ORMException $e) {
            return false;
        }

        return true;
    }
}