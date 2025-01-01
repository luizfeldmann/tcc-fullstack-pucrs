# PUCRS Fullstack TCC

![Workflow Status](https://github.com/luizfeldmann/tcc-fullstack-pucrs/actions/workflows/main.yml/badge.svg)

Final project in the course.

# Development

Start the development server with:
```
npm run dev
```

# Build for Production

Install *docker* in *WSL*:
```
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

sudo usermod -aG docker $USER
```

To build the container:
```
docker build -t tcc-fullstack .
```

To run the container:
```
docker run -p 3000:3000 tcc-fullstack
```

Using the *compose* :

```
docker-compose up --build
```
