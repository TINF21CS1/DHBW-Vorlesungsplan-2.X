# DHBW Vorlesungsplan v2
[![Docker Publish status](https://github.com/TINF21CS1/DHBW-Vorlesungsplan-2.X/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/orgs/TINF21CS1/packages?repo_name=DHBW-Vorlesungsplan-2.X)

Dieser Vorlesungsplan sollte der Nachfolger des aktuell unter [https://vorlesungsplan.dhbw-mannheim.de/](https://vorlesungsplan.dhbw-mannheim.de/) veröffentlichten Vorlesungsplanes sein.

Eine Staging-Version des Vorlesungsplanes ist unter [https://vp2.frereit.de/](https://vp2.frereit.de/) verfügbar. Sie reflektiert den aktuellen Stand der develop branch.

Es ist ein Projekt von Jan-Luca Gruber, Julian Lemmerich, Frederik Reiter und Hauke Platte im Modul Web- und App-Engineering.

## Usage

You need docker and docker-compose installed on the system.

```
curl https://raw.githubusercontent.com/TINF21CS1/DHBW-Vorlesungsplan-2.X/main/docker-compose.yml
docker-compose up -d
```