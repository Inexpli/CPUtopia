<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Product;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('pl_PL');

        // Tworzymy kategorię "Komputery"
        $computers = new Category();
        $computers->setName('Komputery');
        $manager->persist($computers);

        // Lista przykładowych nazw produktów komputerowych
        $computerProducts = [
            'Laptop Lenovo ThinkPad X1 Carbon',
            'Komputer stacjonarny Dell OptiPlex',
            'Monitor LG UltraWide 34"',
            'Klawiatura mechaniczna Logitech G Pro',
            'Mysz gamingowa Razer DeathAdder',
            'Procesor Intel Core i9-13900K',
            'Płyta główna ASUS ROG Strix Z790',
            'Dysk SSD Samsung 980 Pro 1TB',
            'Zasilacz be quiet! Straight Power 750W',
            'Obudowa NZXT H510'
        ];

        foreach ($computerProducts as $name) {
            $product = new Product();
            $product->setName($name);
            $product->setDescription($faker->sentence());
            $product->setPrice($faker->randomFloat(2, 200, 6000));
            $product->setStock($faker->numberBetween(5, 50));
            $product->setCategory($computers);
            $product->setCreatedAt(new \DateTimeImmutable());
            $product->setUpdatedAt(new \DateTimeImmutable());

            $manager->persist($product);
        }

        $manager->flush();
    }
}
