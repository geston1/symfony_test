<?php

namespace App\Service\User;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\ORMException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

/**
 * @User auth service
 *
 * Class Auth
 * @package App\Service\User
 */
class Auth
{
    /**
     * Entity Manager (Dependency Injection)
     *
     * @var EntityManagerInterface
     */
    private $entity_manager;

    /**
     * User repository (Dependency Injection)
     *
     * @var UserRepository
     */
    private $repository;

    /**
     * Password hasher (Dependency Injection)
     *
     * @var UserPasswordHasherInterface
     */
    private $hasher;

    /**
     * Auth constructor.
     * @param EntityManagerInterface $entity_manager
     * @param UserRepository $repository
     * @param UserPasswordHasherInterface $hasher
     */
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

    /**
     * Checks user's password match. Deprecated, security.yaml and jwt auth is used instead.
     * Returns @boolean success - true, error - false.
     *
     * @deprecated
     * @param string $login
     * @param string $password
     * @return bool
     */
    public function authenticate(string $login, string $password): bool
    {
        $user = $this->repository->findOneBy([ 'login' => $login ]);
        if (!$user)
            return false;
        return $this->hasher->isPasswordValid($user, $password);
    }

    /**
     * Creates @User with given username and password.
     * Returns @User.
     *
     * @param string $login
     * @param string $password
     * @return bool
     */
    public function register(string $login, string $password): ?User
    {
        $user = new User();
        $user->setLogin($login);
        $user->setPassword($this->hasher->hashPassword($user, $password));

        try {
            $this->entity_manager->persist($user);
            $this->entity_manager->flush();

            return $user;
        } catch (ORMException $e) {
            return null;
        }

    }

    /**
     * Create @User entity by given username.
     * Returns @boolean success - true, error - false.
     *
     * @param string $login
     * @return User|null
     */
    public function getUserByLogin(string $login): ?User
    {
        return $this->repository->findOneBy([ 'login' => $login ]);
    }

    /**
     * Changes @User's password.
     * Returns @boolean success - true, error - false.
     *
     * @param User $user
     * @param string $password
     * @return bool
     */
    public function setUserPassword(User $user, string $password): bool
    {
        $user->setPassword($this->hasher->hashPassword($user, $password));

        try
        {
            $this->entity_manager->persist($user);
            $this->entity_manager->flush();

            return true;
        }
        catch (\Exception $e)
        {
            return false;
        }
    }
}